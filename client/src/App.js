import React, { Fragment } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Header from "./components/header";
import QuakeTile from "./components/quaketile";
import "./App.css";

const GET_QUAKES = gql`
  query quakeList($after: String) {
    quakes(after: $after) {
      cursor
      hasMore
      quakes {
        id
        location
        magnitute
        when
        cursor
      }
    }
  }
`;

const Quakes = () => {
  const { data, loading, error, fetchMore } = useQuery(GET_QUAKES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  return (
    <Fragment>
      <Header />
      <div className="main">
        {data.quakes &&
          data.quakes.quakes &&
          data.quakes.quakes.map((quake) => (
            <QuakeTile
              key={quake.id}
              id={quake.id}
              magnitute={quake.magnitute}
              location={quake.location}
              when={quake.when}
            />
          ))}
      </div>

      {data.quakes && data.quakes.hasMore && (
        <div className="button-section">
          <button
            className="loadmore"
            onClick={() =>
              fetchMore({
                variables: {
                  after: data.quakes.cursor,
                },
                updateQuery: (prev, { fetchMoreResult, ...rest }) => {
                  if (!fetchMoreResult) return prev;
                  return {
                    ...fetchMoreResult,
                    quakes: {
                      ...fetchMoreResult.quakes,
                      quakes: [
                        ...prev.quakes.quakes,
                        ...fetchMoreResult.quakes.quakes,
                      ],
                    },
                  };
                },
              })
            }
          >
            Load More
          </button>
        </div>
      )}
    </Fragment>
  );
};

export default Quakes;
