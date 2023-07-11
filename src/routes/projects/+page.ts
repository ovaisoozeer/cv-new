import { getProjectRowsViewModel } from '$lib/presenters/project-presenter';

export const ssr = false;

export async function load() {
	const projectRows = await getProjectRowsViewModel();
	return {
		rows: projectRows.reverse()
	};
}
