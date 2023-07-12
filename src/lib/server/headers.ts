import { env } from '$env/dynamic/private';

const MAX_AGE = env.MAX_AGE;

export default function setApiResponseHeaders(
	setHeaders: (headers: Record<string, string>) => void
): void {
	setHeaders({
		'cache-control': 'max-age=0, s-maxage=' + (MAX_AGE || 3600)
	});
}
