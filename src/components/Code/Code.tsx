import React from 'react';

export default function Code({ children }: ICodeProps) {
  const renderProps = () => {
    return (
      children &&
      children.map((prop, index) => (
        <React.Fragment key={index}>
          {' '}
          <span className="hljs-attr">{prop.name}</span>=
          <span className="hljs-string" style={{ color: 'rgb(221, 136, 136)' }}>
            {'{'}
            {prop.value}
            {'}'}
          </span>
        </React.Fragment>
      ))
    );
  };

  return (
    <pre
      className="hljs"
      style={{
        display: 'block',
        overflowX: 'auto',
        padding: '0.5em',
        color: 'rgb(221, 221, 221)',
      }}
    >
      <span className="xml">
        <span className="hljs-tag">
          &lt;
          <span
            className="hljs-name"
            style={{ color: 'rgb(221, 136, 136)', fontWeight: 700 }}
          >
            Carousel
          </span>
          {renderProps()}
          &gt;
        </span>
        {'\n'}
        {'  '}...{'\n'}
        {'  '}
        <span className="hljs-tag">
          &lt;
          <span
            className="hljs-name"
            style={{ color: 'rgb(221, 136, 136)', fontWeight: 700 }}
          >
            div
          </span>{' '}
          <span className="hljs-attr">className</span>=
          <span className="hljs-string" style={{ color: 'rgb(221, 136, 136)' }}>
            {'{'}classes.carouselItem{'}'}
          </span>
          &gt;
        </span>
        {'\n'}
        {'    '}
        <span className="hljs-tag">
          &lt;
          <span
            className="hljs-name"
            style={{ color: 'rgb(221, 136, 136)', fontWeight: 700 }}
          >
            div
          </span>{' '}
          <span className="hljs-attr">className</span>=
          <span className="hljs-string" style={{ color: 'rgb(221, 136, 136)' }}>
            {'{'}classes.carouselItemInner{'}'}
          </span>
          &gt;
        </span>
        1
        <span className="hljs-tag">
          &lt;/
          <span
            className="hljs-name"
            style={{ color: 'rgb(221, 136, 136)', fontWeight: 700 }}
          >
            div
          </span>
          &gt;
        </span>
        {'\n'}
        {'  '}
        <span className="hljs-tag">
          &lt;/
          <span
            className="hljs-name"
            style={{ color: 'rgb(221, 136, 136)', fontWeight: 700 }}
          >
            div
          </span>
          &gt;
        </span>
        {'\n'}
        {'  '}...{'\n'}
        <span className="hljs-tag">
          &lt;/
          <span
            className="hljs-name"
            style={{ color: 'rgb(221, 136, 136)', fontWeight: 700 }}
          >
            Carousel
          </span>
          &gt;
        </span>
      </span>
    </pre>
  );
}

interface IProp {
  name: string;
  value: string;
}

interface ICodeProps {
  children?: IProp[];
}
