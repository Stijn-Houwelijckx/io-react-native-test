import wmoWeatherCodes from '~/data/weatherCodes.json';

export function getWeatherInfo(code:number) {
	const weatherCodes: Record<string, {description: string, image: string, color: string}> = wmoWeatherCodes;
    const codeString = `${code}`;

    if (!weatherCodes[codeString]) {
        throw new Error(`Invalid WMO weather code: ${code}`);
    }

    const data = weatherCodes[codeString];
    return {
		...data,
        code,
    };
}
