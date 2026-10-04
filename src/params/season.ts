import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (param) => /^\d{4}$/u.test(param);
