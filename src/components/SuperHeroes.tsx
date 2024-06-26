import axios from "axios";
import React, { useEffect, useState } from "react";

export type SuperHeroDTO = {
    name: string;
}

export default function SuperHeroes () {
    const [data, setData] = useState<Array<SuperHeroDTO>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        axios.get('http://localhost:4000/superheroes').then(res => {
            setData(res.data)
            setIsLoading(false);
        })
    }, [])

    if (isLoading) {
        return <h2>Loading...</h2>
    }

    return (
        <React.Fragment>
            <h2>Super Heroes Page</h2>
                {data.map((hero) => {
                    return <div key={hero.name}>{hero.name}</div>
                })}
        </React.Fragment>
    );
}
