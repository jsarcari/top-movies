import React from 'react';
import Style from 'style-it';

export default function ShowAverage(props) {
    return Style.it(`

        .average-rating::before {
            --percent: calc(${props.average}/5*100%);
          }
    `,
        <meter className="average-rating" min="0" max="5" value={props.average} title="The movie's average based on all of the The Movie DB user ratings."></meter>
    );
}