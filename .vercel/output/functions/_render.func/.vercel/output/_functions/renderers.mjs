import { DEV } from 'esm-env';
import { a4 as AstroJSX, A as AstroError, S as renderJSX, a5 as createVNode } from './chunks/astro_B6G8DoPH.mjs';

const DERIVED = 1 << 1;
const EFFECT = 1 << 2;
const PRE_EFFECT = 1 << 3;
const RENDER_EFFECT = 1 << 4;
const MANAGED = 1 << 6;
const UNOWNED = 1 << 7;
const CLEAN = 1 << 8;
const DIRTY = 1 << 9;
const MAYBE_DIRTY = 1 << 10;
const INERT = 1 << 11;
const DESTROYED = 1 << 12;

/** @type {import('#client').Equals} */
function equals(value) {
	return value === this.v;
}

/**
 * @template V
 * @param {V} value
 * @returns {import('#client').Source<V>}
 */
/*#__NO_SIDE_EFFECTS__*/
function source(value) {
	/** @type {import('#client').Source<V>} */
	const source = {
		f: 0, // TODO ideally we could skip this altogether, but it causes type errors
		reactions: null,
		equals: equals,
		v: value,
		version: 0
	};

	if (DEV) {
		/** @type {import('#client').ValueDebug<V>} */ (source).inspect = new Set();
	}

	return source;
}

/**
 * @param {import('#client').Effect} signal
 * @returns {void}
 */
function destroy_effect(signal) {
	destroy_children(signal);
	remove_reactions(signal, 0);
	set_signal_status(signal, DESTROYED);

	signal.teardown?.();
	signal.ondestroy?.();
	signal.fn =
		signal.effects =
		signal.teardown =
		signal.ondestroy =
		signal.ctx =
		signal.block =
		signal.deps =
			null;
}

/**
 * @param {import('#client').Derived} derived
 * @param {boolean} force_schedule
 * @returns {void}
 */
function update_derived(derived, force_schedule) {
	destroy_children(derived);
	var value = execute_reaction_fn(derived);

	var status =
		(current_skip_reaction || (derived.f & UNOWNED) !== 0) && derived.deps !== null
			? MAYBE_DIRTY
			: CLEAN;

	set_signal_status(derived, status);

	if (!derived.equals(value)) {
		derived.v = value;
		mark_reactions(derived, DIRTY, force_schedule);

		if (DEV && force_schedule) {
			for (var fn of /** @type {import('#client').DerivedDebug} */ (derived).inspect) fn();
		}
	}
}

/**
 * @param {import('#client').Derived} signal
 * @returns {void}
 */
function destroy_derived(signal) {
	destroy_children(signal);
	remove_reactions(signal, 0);
	set_signal_status(signal, DESTROYED);

	signal.effects =
		signal.deps =
		signal.reactions =
		// @ts-expect-error `signal.fn` cannot be `null` while the signal is alive
		signal.fn =
			null;
}

// Used for handling scheduling
let is_micro_task_queued = false;
let is_flushing_effect = false;

// Handle effect queues

/** @type {import('./types.js').Effect[]} */
let current_queued_pre_and_render_effects = [];

/** @type {import('./types.js').Effect[]} */
let current_queued_effects = [];

let flush_count = 0;

/** @type {null | import('./types.js').Effect} */
let current_effect = null;

/** @type {null | import('./types.js').Value[]} */
let current_dependencies = null;
let current_dependencies_index = 0;

// If we are working with a get() chain that has no active container,
// to prevent memory leaks, we skip adding the reaction.
let current_skip_reaction = false;
// Handling runtime component context

/** @type {import('./types.js').ComponentContext | null} */
let current_component_context = null;

/** @returns {boolean} */
function is_runes() {
	return current_component_context !== null && current_component_context.r;
}

/**
 * Determines whether a derived or effect is dirty.
 * If it is MAYBE_DIRTY, will set the status to CLEAN
 * @param {import('./types.js').Reaction} reaction
 * @returns {boolean}
 */
function check_dirtiness(reaction) {
	var flags = reaction.f;

	if ((flags & DIRTY) !== 0) {
		return true;
	}

	if ((flags & MAYBE_DIRTY) !== 0) {
		var dependencies = reaction.deps;

		if (dependencies !== null) {
			var length = dependencies.length;

			for (var i = 0; i < length; i++) {
				var dependency = dependencies[i];

				if (check_dirtiness(/** @type {import('#client').Derived} */ (dependency))) {
					update_derived(/** @type {import('#client').Derived} **/ (dependency), true);

					// `signal` might now be dirty, as a result of calling `update_derived`
					if ((reaction.f & DIRTY) !== 0) {
						return true;
					}
				}

				// If we're working with an unowned derived signal, then we need to check
				// if our dependency write version is higher. If it is then we can assume
				// that state has changed to a newer version and thus this unowned signal
				// is also dirty.
				var is_unowned = (flags & UNOWNED) !== 0;
				var version = dependency.version;

				if (is_unowned && version > /** @type {import('#client').Derived} */ (reaction).version) {
					/** @type {import('#client').Derived} */ (reaction).version = version;
					return true;
				}
			}
		}

		set_signal_status(reaction, CLEAN);
	}

	return false;
}

/**
 * @template V
 * @param {import('./types.js').Reaction} signal
 * @returns {V}
 */
function execute_reaction_fn(signal) {
	const fn = signal.fn;
	const flags = signal.f;
	const is_render_effect = (flags & RENDER_EFFECT) !== 0;

	const previous_dependencies = current_dependencies;
	const previous_dependencies_index = current_dependencies_index;
	const previous_skip_reaction = current_skip_reaction;

	current_dependencies = /** @type {null | import('./types.js').Value[]} */ (null);
	current_dependencies_index = 0;
	current_skip_reaction = !is_flushing_effect && (flags & UNOWNED) !== 0;

	try {
		let res;
		if (is_render_effect) {
			res = /** @type {(block: import('#client').Block, signal: import('#client').Signal) => V} */ (
				fn
			)(
				/** @type {import('#client').Block} */ (
					/** @type {import('#client').Effect} */ (signal).block
				),
				/** @type {import('#client').Signal} */ (signal)
			);
		} else {
			res = /** @type {() => V} */ (fn)();
		}
		let dependencies = /** @type {import('./types.js').Value<unknown>[]} **/ (signal.deps);
		if (current_dependencies !== null) {
			let i;
			if (dependencies !== null) {
				const deps_length = dependencies.length;
				// Include any dependencies up until the current_dependencies_index.
				const full_current_dependencies =
					current_dependencies_index === 0
						? current_dependencies
						: dependencies.slice(0, current_dependencies_index).concat(current_dependencies);
				const current_dep_length = full_current_dependencies.length;
				// If we have more than 16 elements in the array then use a Set for faster performance
				// TODO: evaluate if we should always just use a Set or not here?
				const full_current_dependencies_set =
					current_dep_length > 16 && deps_length - current_dependencies_index > 1
						? new Set(full_current_dependencies)
						: null;
				for (i = current_dependencies_index; i < deps_length; i++) {
					const dependency = dependencies[i];
					if (
						full_current_dependencies_set !== null
							? !full_current_dependencies_set.has(dependency)
							: !full_current_dependencies.includes(dependency)
					) {
						remove_reaction(signal, dependency);
					}
				}
			}

			if (dependencies !== null && current_dependencies_index > 0) {
				dependencies.length = current_dependencies_index + current_dependencies.length;
				for (i = 0; i < current_dependencies.length; i++) {
					dependencies[current_dependencies_index + i] = current_dependencies[i];
				}
			} else {
				signal.deps = /** @type {import('./types.js').Value<V>[]} **/ (
					dependencies = current_dependencies
				);
			}

			if (!current_skip_reaction) {
				for (i = current_dependencies_index; i < dependencies.length; i++) {
					const dependency = dependencies[i];
					const reactions = dependency.reactions;

					if (reactions === null) {
						dependency.reactions = [signal];
					} else if (reactions[reactions.length - 1] !== signal) {
						// TODO: should this be:
						//
						// } else if (!reactions.includes(signal)) {
						//
						reactions.push(signal);
					}
				}
			}
		} else if (dependencies !== null && current_dependencies_index < dependencies.length) {
			remove_reactions(signal, current_dependencies_index);
			dependencies.length = current_dependencies_index;
		}
		return res;
	} finally {
		current_dependencies = previous_dependencies;
		current_dependencies_index = previous_dependencies_index;
		current_skip_reaction = previous_skip_reaction;
	}
}

/**
 * @template V
 * @param {import('./types.js').Reaction} signal
 * @param {import('./types.js').Value<V>} dependency
 * @returns {void}
 */
function remove_reaction(signal, dependency) {
	const reactions = dependency.reactions;
	let reactions_length = 0;
	if (reactions !== null) {
		reactions_length = reactions.length - 1;
		const index = reactions.indexOf(signal);
		if (index !== -1) {
			if (reactions_length === 0) {
				dependency.reactions = null;
			} else {
				// Swap with last element and then remove.
				reactions[index] = reactions[reactions_length];
				reactions.pop();
			}
		}
	}
	if (reactions_length === 0 && (dependency.f & UNOWNED) !== 0) {
		// If the signal is unowned then we need to make sure to change it to dirty.
		set_signal_status(dependency, DIRTY);
		remove_reactions(/** @type {import('./types.js').Derived} **/ (dependency), 0);
	}
}

/**
 * @param {import('./types.js').Reaction} signal
 * @param {number} start_index
 * @returns {void}
 */
function remove_reactions(signal, start_index) {
	const dependencies = signal.deps;
	if (dependencies !== null) {
		const active_dependencies = start_index === 0 ? null : dependencies.slice(0, start_index);
		let i;
		for (i = start_index; i < dependencies.length; i++) {
			const dependency = dependencies[i];
			// Avoid removing a reaction if we know that it is active (start_index will not be 0)
			if (active_dependencies === null || !active_dependencies.includes(dependency)) {
				remove_reaction(signal, dependency);
			}
		}
	}
}

/**
 * @param {import('./types.js').Reaction} signal
 * @returns {void}
 */
function destroy_children(signal) {
	if (signal.effects) {
		for (var i = 0; i < signal.effects.length; i += 1) {
			var effect = signal.effects[i];
			if ((effect.f & MANAGED) === 0) {
				destroy_effect(effect);
			}
		}
		signal.effects = null;
	}

	if (signal.deriveds) {
		for (i = 0; i < signal.deriveds.length; i += 1) {
			destroy_derived(signal.deriveds[i]);
		}
		signal.deriveds = null;
	}
}

/**
 * @param {import('./types.js').Effect} signal
 * @returns {void}
 */
function execute_effect(signal) {
	if ((signal.f & DESTROYED) !== 0) {
		return;
	}

	const previous_effect = current_effect;
	const previous_component_context = current_component_context;

	const component_context = signal.ctx;

	current_effect = signal;
	current_component_context = component_context;
	signal.block;

	try {
		destroy_children(signal);
		signal.teardown?.();
		const teardown = execute_reaction_fn(signal);
		signal.teardown = typeof teardown === 'function' ? teardown : null;
	} finally {
		current_effect = previous_effect;
		current_component_context = previous_component_context;
	}

	if ((signal.f & PRE_EFFECT) !== 0 && current_queued_pre_and_render_effects.length > 0) {
		flush_local_pre_effects(component_context);
	}
}

function infinite_loop_guard() {
	if (flush_count > 100) {
		flush_count = 0;
		throw new Error(
			'ERR_SVELTE_TOO_MANY_UPDATES' +
				(DEV
					? ': Maximum update depth exceeded. This can happen when a reactive block or effect ' +
						'repeatedly sets a new value. Svelte limits the number of nested updates to prevent infinite loops.'
					: '')
		);
	}
	flush_count++;
}

/**
 * @param {Array<import('./types.js').Effect>} effects
 * @returns {void}
 */
function flush_queued_effects(effects) {
	var length = effects.length;
	if (length === 0) return;

	infinite_loop_guard();
	var previously_flushing_effect = is_flushing_effect;
	is_flushing_effect = true;

	try {
		for (var i = 0; i < length; i++) {
			var signal = effects[i];

			if ((signal.f & (DESTROYED | INERT)) === 0) {
				if (check_dirtiness(signal)) {
					set_signal_status(signal, CLEAN);
					execute_effect(signal);
				}
			}
		}
	} finally {
		is_flushing_effect = previously_flushing_effect;
	}

	effects.length = 0;
}

function process_microtask() {
	is_micro_task_queued = false;
	if (flush_count > 101) {
		return;
	}
	const previous_queued_pre_and_render_effects = current_queued_pre_and_render_effects;
	const previous_queued_effects = current_queued_effects;
	current_queued_pre_and_render_effects = [];
	current_queued_effects = [];
	flush_queued_effects(previous_queued_pre_and_render_effects);
	flush_queued_effects(previous_queued_effects);
	if (!is_micro_task_queued) {
		flush_count = 0;
	}
}

/**
 * @param {import('./types.js').Effect} signal
 * @param {boolean} sync
 * @returns {void}
 */
function schedule_effect(signal, sync) {
	const flags = signal.f;
	if (sync) {
		const previously_flushing_effect = is_flushing_effect;
		try {
			is_flushing_effect = true;
			execute_effect(signal);
			set_signal_status(signal, CLEAN);
		} finally {
			is_flushing_effect = previously_flushing_effect;
		}
	} else {
		{
			if (!is_micro_task_queued) {
				is_micro_task_queued = true;
				queueMicrotask(process_microtask);
			}
		}
		if ((flags & EFFECT) !== 0) {
			current_queued_effects.push(signal);
			// Prevent any nested user effects from potentially triggering
			// before this effect is scheduled. We know they will be destroyed
			// so we can make them inert to avoid having to find them in the
			// queue and remove them.
			if ((flags & MANAGED) === 0) {
				mark_subtree_children_inert(signal, true);
			}
		} else {
			// We need to ensure we insert the signal in the right topological order. In other words,
			// we need to evaluate where to insert the signal based off its level and whether or not it's
			// a pre-effect and within the same block. By checking the signals in the queue in reverse order
			// we can find the right place quickly. TODO: maybe opt to use a linked list rather than an array
			// for these operations.
			const length = current_queued_pre_and_render_effects.length;
			let should_append = length === 0;

			if (!should_append) {
				const target_level = signal.l;
				const target_block = signal.block;
				const is_pre_effect = (flags & PRE_EFFECT) !== 0;
				let target_signal;
				let target_signal_level;
				let is_target_pre_effect;
				let i = length;
				while (true) {
					target_signal = current_queued_pre_and_render_effects[--i];
					target_signal_level = target_signal.l;
					if (target_signal_level <= target_level) {
						if (i + 1 === length) {
							should_append = true;
						} else {
							is_target_pre_effect = (target_signal.f & PRE_EFFECT) !== 0;
							if (
								target_signal_level < target_level ||
								target_signal.block !== target_block ||
								(is_target_pre_effect && !is_pre_effect)
							) {
								i++;
							}
							current_queued_pre_and_render_effects.splice(i, 0, signal);
						}
						break;
					}
					if (i === 0) {
						current_queued_pre_and_render_effects.unshift(signal);
						break;
					}
				}
			}

			if (should_append) {
				current_queued_pre_and_render_effects.push(signal);
			}
		}
	}
}

/**
 * @param {null | import('./types.js').ComponentContext} context
 * @returns {void}
 */
function flush_local_pre_effects(context) {
	const effects = [];
	for (let i = 0; i < current_queued_pre_and_render_effects.length; i++) {
		const effect = current_queued_pre_and_render_effects[i];
		if ((effect.f & PRE_EFFECT) !== 0 && effect.ctx === context) {
			effects.push(effect);
			current_queued_pre_and_render_effects.splice(i, 1);
			i--;
		}
	}
	flush_queued_effects(effects);
}

/**
 * @param {import('#client').Effect} signal
 * @param {boolean} inert
 * @returns {void}
 */
function mark_subtree_children_inert(signal, inert) {
	const effects = signal.effects;

	if (effects !== null) {
		for (var i = 0; i < effects.length; i++) {
			mark_subtree_inert(effects[i], inert);
		}
	}
}

/**
 * @param {import('#client').Effect} signal
 * @param {boolean} inert
 * @returns {void}
 */
function mark_subtree_inert(signal, inert) {
	const flags = signal.f;
	const is_already_inert = (flags & INERT) !== 0;

	if (is_already_inert !== inert) {
		signal.f ^= INERT;
		if (!inert && (flags & CLEAN) === 0) {
			schedule_effect(signal, false);
		}
	}

	mark_subtree_children_inert(signal, inert);
}

/**
 * @param {import('#client').Value} signal
 * @param {number} to_status
 * @param {boolean} force_schedule
 * @returns {void}
 */
function mark_reactions(signal, to_status, force_schedule) {
	var reactions = signal.reactions;
	if (reactions === null) return;

	var runes = is_runes();
	var length = reactions.length;

	for (var i = 0; i < length; i++) {
		var reaction = reactions[i];

		// We skip any effects that are already dirty (but not unowned). Additionally, we also
		// skip if the reaction is the same as the current effect (except if we're not in runes or we
		// are in force schedule mode).
		if ((!force_schedule || !runes) && reaction === current_effect) {
			continue;
		}

		var flags = reaction.f;
		set_signal_status(reaction, to_status);

		// If the signal is not clean, then skip over it – with the exception of unowned signals that
		// are already maybe dirty. Unowned signals might be dirty because they are not captured as part of an
		// effect.
		var maybe_dirty = (flags & MAYBE_DIRTY) !== 0;
		var unowned = (flags & UNOWNED) !== 0;

		if ((flags & CLEAN) !== 0 || (maybe_dirty && unowned)) {
			if ((reaction.f & DERIVED) !== 0) {
				mark_reactions(
					/** @type {import('#client').Derived} */ (reaction),
					MAYBE_DIRTY,
					force_schedule
				);
			} else {
				schedule_effect(/** @type {import('#client').Effect} */ (reaction), false);
			}
		}
	}
}

const STATUS_MASK = ~(DIRTY | MAYBE_DIRTY | CLEAN);

/**
 * @param {import('./types.js').Signal} signal
 * @param {number} status
 * @returns {void}
 */
function set_signal_status(signal, status) {
	signal.f = (signal.f & STATUS_MASK) | status;
}

/**
 * @param {Record<string, unknown>} props
 * @param {any} runes
 * @param {Function} [fn]
 * @returns {void}
 */
function push(props, runes = false, fn) {
	current_component_context = {
		// exports (and props, if `accessors: true`)
		x: null,
		// context
		c: null,
		// effects
		e: null,
		// mounted
		m: false,
		// parent
		p: current_component_context,
		// signals
		d: null,
		// props
		s: props,
		// runes
		r: runes,
		// legacy $:
		l1: [],
		l2: source(false),
		// update_callbacks
		u: null
	};

	if (DEV) {
		// component function
		// @ts-expect-error
		current_component_context.function = fn;
	}
}

/**
 * @template {Record<string, any>} T
 * @param {T} [component]
 * @returns {T}
 */
function pop(component) {
	const context_stack_item = current_component_context;
	if (context_stack_item !== null) {
		if (component !== undefined) {
			context_stack_item.x = component;
		}
		const effects = context_stack_item.e;
		if (effects !== null) {
			context_stack_item.e = null;
			for (let i = 0; i < effects.length; i++) {
				schedule_effect(effects[i], false);
			}
		}
		current_component_context = context_stack_item.p;
		context_stack_item.m = true;
	}
	// Micro-optimization: Don't set .a above to the empty object
	// so it can be garbage-collected when the return here is unused
	return component || /** @type {T} */ ({});
}

if (DEV) {
	/** @param {string} rune */
	function throw_rune_error(rune) {
		if (!(rune in globalThis)) {
			// @ts-ignore
			globalThis[rune] = () => {
				// TODO if people start adjusting the "this can contain runes" config through v-p-s more, adjust this message
				throw new Error(`${rune} is only available inside .svelte and .svelte.js/ts files`);
			};
		}
	}

	throw_rune_error('$state');
	throw_rune_error('$effect');
	throw_rune_error('$derived');
	throw_rune_error('$inspect');
	throw_rune_error('$props');
}

const snippet_symbol = Symbol.for('svelte.snippet');

/**
 * @param {any} fn
 */
function add_snippet_symbol(fn) {
	fn[snippet_symbol] = true;
	return fn;
}

/** @returns {Payload} */
function create_payload() {
	return { out: '', head: { title: '', out: '', anchor: 0 }, anchor: 0 };
}

/**
 * Array of `onDestroy` callbacks that should be called at the end of the server render function
 * @type {Function[]}
 */
let on_destroy = [];

/**
 * @param {(...args: any[]) => void} component
 * @param {{ props: Record<string, any>; context?: Map<any, any> }} options
 * @returns {RenderOutput}
 */
function render(component, options) {
	const payload = create_payload();
	const root_anchor = create_anchor(payload);
	const root_head_anchor = create_anchor(payload.head);

	const prev_on_destroy = on_destroy;
	on_destroy = [];
	payload.out += root_anchor;

	if (options.context) {
		push({});
		/** @type {import('../client/types.js').ComponentContext} */ (current_component_context).c =
			options.context;
	}
	component(payload, options.props, {}, {});
	if (options.context) {
		pop();
	}
	payload.out += root_anchor;
	for (const cleanup of on_destroy) cleanup();
	on_destroy = prev_on_destroy;

	return {
		head:
			payload.head.out || payload.head.title
				? payload.head.title + root_head_anchor + payload.head.out + root_head_anchor
				: '',
		html: payload.out
	};
}

/** @param {{ anchor: number }} payload */
function create_anchor(payload) {
	const depth = payload.anchor++;
	return `<!--ssr:${depth}-->`;
}

const tagSlotAsSnippet = add_snippet_symbol ;
function check$1(Component) {
  const str = Component.toString();
  return str.includes("$$payload") && str.includes("$$props");
}
function needsHydration(metadata) {
  return metadata.astroStaticSlot ? !!metadata.hydrate : true;
}
async function renderToStaticMarkup$1(Component, props, slotted, metadata) {
  const tagName = needsHydration(metadata) ? "astro-slot" : "astro-static-slot";
  let children = void 0;
  let $$slots = void 0;
  for (const [key, value] of Object.entries(slotted)) {
    if (key === "default") {
      children = tagSlotAsSnippet(() => `<${tagName}>${value}</${tagName}>`);
    } else {
      $$slots ??= {};
      $$slots[key] = tagSlotAsSnippet(() => `<${tagName} name="${key}">${value}</${tagName}>`);
    }
  }
  const { html } = render(Component, {
    props: {
      ...props,
      children,
      $$slots
    }
  });
  return { html };
}
const _renderer0 = {
  check: check$1,
  renderToStaticMarkup: renderToStaticMarkup$1,
  supportsAstroStaticSlot: true
};

const slotName = (str) => str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());
async function check(Component, props, { default: children = null, ...slotted } = {}) {
  if (typeof Component !== "function")
    return false;
  const slots = {};
  for (const [key, value] of Object.entries(slotted)) {
    const name = slotName(key);
    slots[name] = value;
  }
  try {
    const result = await Component({ ...props, ...slots, children });
    return result[AstroJSX];
  } catch (e) {
    const error = e;
    if (Component[Symbol.for("mdx-component")]) {
      throw new AstroError({
        message: error.message,
        title: error.name,
        hint: `This issue often occurs when your MDX component encounters runtime errors.`,
        name: error.name,
        stack: error.stack
      });
    }
  }
  return false;
}
async function renderToStaticMarkup(Component, props = {}, { default: children = null, ...slotted } = {}) {
  const slots = {};
  for (const [key, value] of Object.entries(slotted)) {
    const name = slotName(key);
    slots[name] = value;
  }
  const { result } = this;
  const html = await renderJSX(result, createVNode(Component, { ...props, ...slots, children }));
  return { html };
}
var server_default = {
  check,
  renderToStaticMarkup
};

const renderers = [Object.assign({"name":"@astrojs/svelte","clientEntrypoint":"@astrojs/svelte/client-v5.js","serverEntrypoint":"@astrojs/svelte/server-v5.js"}, { ssr: _renderer0 }),Object.assign({"name":"astro:jsx","serverEntrypoint":"astro/jsx/server.js","jsxImportSource":"astro"}, { ssr: server_default }),];

export { renderers };
