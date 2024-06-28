import { useState } from "react";
import { useSuperHeroesData } from "../hooks/useSuperHeroes";
import { SuperHeroDTO } from "./SuperHeroes";
import { NavLink } from "react-router-dom";

export default function RQSuperHeroesHM() {
  const fetchOnMount = true;
  const [pooling, setPooling] = useState(true);

  const onSuccess = (data: Array<SuperHeroDTO>) => {
    if (data.length >= 4) {
      setPooling(false);
      console.log("Data greater than 4, pooling stopped");
    }
    console.log("after data fetching", data);
  };

  const onError = (error: Error) => {
    setPooling(false);
    console.log("error", { message: error.message });
  };

  const {
    data: heroes,
    isLoading,
    error,
    isFetching,
    refetch,
  } = useSuperHeroesData(onSuccess, onError, pooling, fetchOnMount);

  if (error) {
    return (
      <>
        <div>Super-Heroes-onclick page</div>
        <div>
          An error occured :(
          <div>{error.message}</div>
        </div>
      </>
    );
  }

  if (isLoading || isFetching) {
    return (
      <>
        <div>Loading superheroes...</div>
      </>
    );
  }

  return (
    <>
      <button onClick={() => refetch()}>Fetch heroes</button>
      <div>
        {heroes ? (
          <>
            {heroes?.map((hero) => {
              return (
                <NavLink to={hero?.id} key={hero?.id}>
                  <td>{hero?.name}</td>
                </NavLink>
              );
            })}
          </>
        ) : (
          "no data"
        )}
      </div>
    </>
  );
}
