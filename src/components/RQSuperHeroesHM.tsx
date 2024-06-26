import { useState } from "react";
import { useSuperHeroesData } from "../hooks/useSuperHeroes";
import { SuperHeroDTO } from "./SuperHeroes";

export default function RQSuperHeroesHM() {
    const fetchOnMount = false
    const [pooling, setPooling] = useState(true);

    const onSuccess = (data: Array<SuperHeroDTO>) => {
        if (data.length >= 4) {
            setPooling(false);
            console.log('Data greater than 4, pooling stopped');
        }
        console.log('after data fetching', data);
    }

    const onError = (error: Error) => {
        setPooling(false);
        console.log('error', {message: error.message});
    }

    const { data: heroes, isLoading, error, isFetching, refetch} =
        useSuperHeroesData(onSuccess, onError, pooling, fetchOnMount)

    if (error) {
        return <>
            <div>Super-Heroes-onclick page</div>
            <div>
                An error occured :(
                <div>{error.message}</div>
            </div>
        </>
    }

    if (isLoading || isFetching) {
        return <>
            <div>Loading superheroes...</div>
        </>
    }

    return (
        <>
            <button onClick={() => refetch()}>Fetch heroes</button>
            <div>
                {heroes ? (<>
                    <table >
                        <thead>
                            <tr>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {heroes?.map((name) => {
                                return <tr key={String(name)}>
                                    <td>{String(name)}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </>
                ) : ('no data')}

            </div>
        </>
    )
}
