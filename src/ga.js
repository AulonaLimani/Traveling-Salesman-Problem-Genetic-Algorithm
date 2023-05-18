function calculateFitness() {
    let currentRecord = Infinity;
    for (let i = 0; i < population.length; i++) {
        const d = calcDistance(cities, population[i]);
        currentDistance = d;

        if (worstDistance !== 0) {
            if (d > worstDistance) {
                worstDistance = d;
            }
        } else {
            worstDistance = d;
        }

        if (d < recordDistance) {
            recordDistance = d;
            bestEver = population[i];
            foundCout = 0;
        } else {
            foundCout++;
            if (foundCout >= foundComparisons) {
                found = true;
            }
        }
        if (d < currentRecord) {
            currentRecord = d;
            currentBest = population[i];
        }
        fitness[i] = 1 / (pow(d, 8) + 1);
    }
}

function normalizeFitness() {
    let sum = 0;
    for (let i = 0; i < fitness.length; i++) {
        sum += fitness[i];
    }
    for (let i = 0; i < fitness.length; i++) {
        fitness[i] = fitness[i] / sum;
    }
}

function nextGeneration() {
    const newPopulation = [];
    for (var i = 0; i < population.length; i++) {
        const orderA = pickOne(population, fitness);
        const orderB = pickOne(population, fitness);
        const order = crossOver(orderA, orderB);
        mutate(order, 0.01);
        newPopulation[i] = order;
    }
    population = newPopulation;

}

function pickOne(list, prob) {
    let index = 0;
    let r = random(1);

    while (r > 0) {
        r = r - prob[index];
        index++;
    }
    index--;
    return list[index].slice();
}

function crossOver(orderA, orderB) {
    const start = floor(random(orderA.length));
    const end = floor(random(start + 1, orderA.length));
    const neworder = orderA.slice(start, end);
    for (let i = 0; i < orderB.length; i++) {
        const city = orderB[i];
        if (!neworder.includes(city)) {
            neworder.push(city);
        }
    }
    return neworder;
}

function mutate(order, mutationRate) {
    for (let i = 0; i < cities.length; i++) {
        if (random(1) < mutationRate) {
            const indexA = floor(random(order.length));
            const indexB = (indexA + 1) % cities.length;
            swap(order, indexA, indexB);
        }
    }
}

function swap(a, i, j) {
    const temp = a[i];
    a[i] = a[j];
    a[j] = temp;
}

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
