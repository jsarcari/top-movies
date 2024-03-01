import React from 'react';
import Style from 'style-it';

export default function ShowAverage(props) {
    return Style.it(`
        .average-rating {
            position: relative;
            appearance: none;
            color: transparent;
            width: auto;
            display: inline-block;
            vertical-align: baseline;
        }

        .average-rating::before {
            --percent: calc(${props.average}/5*100%);
            content: '★★★★★';
            position: absolute;
            top: 0;
            left: 0;
            color: rgba(0,0,0,0.2);
            background:
              linear-gradient(90deg, gold var(--percent), rgba(0,0,0,0.2) var(--percent));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
    `,
        <meter className="average-rating" min="0" max="5" value={props.average} title="The movie's average based on all of the The Movie DB user ratings.">{props.average} out of 5</meter>
    );
}