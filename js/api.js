async function fetchData() {
    try {
        const basePath = window.location.pathname.includes('/pages/') ? '../data/produtos.json' : 'data/produtos.json';
        const response = await fetch(basePath);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}