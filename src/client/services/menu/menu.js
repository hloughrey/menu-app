export async function getItems(filter) {
    const baseUrl = '/api/items';
    const reactQueryParams = Object.keys(filter).includes('queryKey');

    let url =
        filter && !reactQueryParams ? `${baseUrl}?filter=${filter}` : baseUrl;

    const result = await fetch(url);

    if (result.status >= 400) {
        throw new Error(`Items API threw a ${result.status} error`);
    }

    return await result.json();
}
