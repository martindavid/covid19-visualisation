import React from "react";
import styles from "./card.module.scss";

type CardProps = {
  title: string;
  subtitle: string;
  iconClass?: string;
  additionalStats?: number;
};

export const Card = (props: CardProps) => {
  const increased = props.additionalStats > 0;
  return (
    <div className={styles.card}>
      <div className={styles.cardBody}>
        <div className="row">
          <div className="col">
            <h5 className="card-title text-uppercase text-muted mb-0">
              {props.title}
            </h5>
            <span className="h2 font-weight-bold mb-0">{props.subtitle}</span>
          </div>
          {props.iconClass && (
            <div className="col-auto">
              <div className={styles.icon}>
                <i className={`fa ${props.iconClass}`}></i>
              </div>
            </div>
          )}
        </div>
        {props.additionalStats && (
          <p className="mt-3 mb-0 text-sm">
            <span
              className={`${increased ? "text-danger" : "text-success"} mr-2`}
            >
              <i
                className={`fa ${increased ? "fa-arrow-up" : "fa-arrow-down"}`}
              ></i>{" "}
              {props.additionalStats.toFixed(2).toString()}%
            </span>
            <span className="text-nowrap">Since last week</span>
          </p>
        )}
      </div>
    </div>
  );
};
