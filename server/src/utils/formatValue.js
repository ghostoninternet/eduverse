function formatValue(x) {
    if (typeof x === 'number' && !Number.isInteger(x)) {
        return x.toFixed(1); 
    }
    return x; 
}

export default formatValue