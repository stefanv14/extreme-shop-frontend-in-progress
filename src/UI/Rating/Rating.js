import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export default function Rating(props) {
  return !props.value ? (
    <div></div>
  ) : (
    <div className="rating ml-3">
      <span>
        {props.value >= 1 ? (
          <FontAwesomeIcon icon={faStar} className="text-warning" />
        ) : props.value >= 0.5 ? (
          <FontAwesomeIcon icon={faStarHalf} className="text-warning" />
        ) : (
          <div></div>
        )}
      </span>
      <span>
        {props.value >= 2 ? (
          <FontAwesomeIcon icon={faStar} className="text-warning" />
        ) : props.value >= 1.5 ? (
          <FontAwesomeIcon icon={faStarHalf} className="text-warning" />
        ) : (
          <div></div>
        )}
      </span>
      <span>
        {props.value >= 3 ? (
          <FontAwesomeIcon icon={faStar} className="text-warning" />
        ) : props.value >= 2.5 ? (
          <FontAwesomeIcon icon={faStarHalf} className="text-warning" />
        ) : (
          <div></div>
        )}
      </span>
      <span>
        {props.value >= 4 ? (
          <FontAwesomeIcon icon={faStar} className="text-warning" />
        ) : props.value >= 3.5 ? (
          <FontAwesomeIcon icon={faStarHalf} className="text-warning" />
        ) : (
          <div></div>
        )}
      </span>
      <span>
        {props.value >= 5 ? (
          <FontAwesomeIcon icon={faStar} className="text-warning" />
        ) : props.value >= 4.5 ? (
          <FontAwesomeIcon icon={faStarHalf} className="text-warning" />
        ) : (
          <div></div>
        )}
      </span>
    </div>
  );
}
