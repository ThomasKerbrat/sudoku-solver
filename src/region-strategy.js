class RegionStrategy {

    /**
     * @returns {number} The next grid index for a row.
     */
    static Row(region_index, cell_index) {
        return (region_index * 9) + cell_index
    }

    /**
     * @returns {number} The next grid index for a column.
     */
    static Column(region_index, cell_index) {
        return region_index + ((cell_index) * 9)
    }

    /**
     * @returns {number} The next grid index for a row.
     */
    static Subgrid(region_index, cell_index) { // 4, 2
        let index = Math.floor(region_index / 3) * 27
        index += region_index % 3 * 3
        index += Math.floor((cell_index) / 3) * 9
        index += (cell_index) % 3
        return index
    }

}

module.exports = RegionStrategy
