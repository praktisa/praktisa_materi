import { useState } from 'react'

export default function useArray(defaultValue) {
    const [array, setArray] = useState(defaultValue)

    function push(value) {
        setArray(a => [...a, value])
    }

    function update(index, value) {
        setArray(a => [...a.slice(0, index), value, ...a.slice(index + 1, a.length - 1)])
    }

    function remove(index) {

        setArray(a => [...a.slice(0, index), ...a.slice(index + 1, a.length - 1)])
    }

    function remove2(array, value) {
        let index = array

    }

    function filter(callback) {
        setArray(a => a.filter(callback))
    }

    return {
        array, push, update, remove, filter
    }
}
