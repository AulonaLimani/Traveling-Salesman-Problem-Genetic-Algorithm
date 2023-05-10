function calcDistance(points, order) {
    let sum = 0;
    for (let i = 0; i < order.length - 1; i++) {
        const cityAIndex = order[i];
        const cityA = points[cityAIndex];
        const cityBIndex = order[i + 1];
        const cityB = points[cityBIndex];
        const d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
        sum += d;
    }
    const firstCity = points[order[0]];
    const lastCity = points[order[order.length - 1]];
    const finalDistance = dist(firstCity.x, firstCity.y, lastCity.x, lastCity.y);
    sum += finalDistance;
    return sum;
}
