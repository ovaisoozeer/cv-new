import type { ProjectRow } from '$lib/display-types/project-row';

export async function getProjectRowsViewModel(): Promise<Array<ProjectRow>> {
	const resp = await fetch('/api/project-list');
	const rows = resp.json();
	return rows;
}
