import React from "react";

import "./SfCard.css";
import { Col, Row } from "react-bootstrap";

interface SfCardProps {
  header: string | React.ReactNode | React.ReactNode[];
  subTitle?: string | string[] | React.ReactNode | React.ReactNode[];
  content?: string | string[] | React.ReactNode | React.ReactNode[];
  cardActions: React.ReactNode | React.ReactNode[];
  className?: string;
}

const _header = (header: string | React.ReactNode | React.ReactNode[]) => {
  if (typeof header === "string") {
    if (header.length >= 25) {
      return header.slice(0, 25) + "...";
    } else {
      return header;
    }
  } else {
    return header;
  }
};

export const SfCard = ({
  header,
  subTitle,
  content,
  cardActions,
  className,
}: SfCardProps) => {
  return (
    <div className={` ${className}`}>
      <div className='e-card-header'>
        <div className='e-card-header-caption'>
          <Row>
            <Col>
              <div className='e-card-header-title cardHeader'>
                {_header(header)}
              </div>
            </Col>
          </Row>

          {subTitle ? (
            Array.isArray(subTitle) ? (
              subTitle.map((item) => {
                return <div className='e-card-sub-title'>{item}</div>;
              })
            ) : (
              <div className='e-card-sub-title'>{subTitle}</div>
            )
          ) : null}
        </div>
      </div>
      <div className='e-card-content'>
        {content ? <div>{content}</div> : null}
      </div>
      {cardActions ? <div className='e-card-actions'>{cardActions}</div> : null}
    </div>
  );
};
