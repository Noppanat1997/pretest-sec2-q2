import { useEffect, useState } from 'react';
import './App.css';

function App () {
    const [filter, setFilter] = useState('')
    const [categories, setCategories] = useState([])
    const [result, setResult] = useState([])

    const onFilterChange = (e) => {
        setFilter(e.target.value)
    }

    useEffect(() => {
        fetch('https://api.publicapis.org/categories')
            .then(response => response.json())
            .then(data => setCategories(data.categories));
    }, [])

    useEffect(() => {
        if (filter.length > 0) {
            setResult(categories.filter(cate => cate.toLowerCase().includes(filter.toLowerCase())))
        } else {
            setResult(categories)
        }
    }, [filter])

    return (
        <div className="container">
            <div className='content'>
                <div className='input'>Filter: <input defaultValue={filter} value={filter} onChange={onFilterChange} /></div>
                <table>
                    <th>Categories</th>
                    {result.map((v) => <tr>{v}</tr>)}
                </table>
            </div>
        </div>
    );
}

export default App;
