import * as React from 'react';

import { SvgIcon, SvgIconProps } from '@mui/joy';

import { Brand } from '~/common/app.config';
import { capitalizeFirstLetter } from '~/common/util/textUtils';

export function AgiSquircleIcon(props: { inverted?: boolean, altColor?: string } & SvgIconProps) {
  const { inverted, altColor, ...rest } = props;
  return (
    <SvgIcon
      titleAccess={`${capitalizeFirstLetter(Brand.Title.Base)} logo mark`}
      viewBox='0 0 64 64' // Update viewBox to match the new SVG's size
      {...rest}
    >
      <defs>
        <style>
          {`.cls-1 { fill: ${inverted ? 'currentColor' : (altColor || '#afafaf')}; }`}
        </style>
      </defs>
      <g>
        <path className="cls-1" d="M53.4,46.99a6.9954,6.9954,0,0,0-4.5-2.03l-8.94-8.95-7.04,7.78,8.58,8.58a6.9093,6.9093,0,0,0,2.02,4.49,6.9827,6.9827,0,0,0,9.88-9.87Zm-4.94,7.55a2.615,2.615,0,1,1,2.62-2.62A2.6162,2.6162,0,0,1,48.46,54.54Z"/>
        <path className="cls-1" d="M27.95,24.01a12.2117,12.2117,0,1,0-7.41,7.41l4.6,4.59,7.41-7.41Zm-9.36,3.91-8.01-2.14L8.44,17.77,14.3,11.9l8.01,2.15,2.15,8.01Z"/>
        <path className="cls-1" d="M59.25,17.34,50.58,27.6l-7.25-1.59-2.77-6.88,7.98-9.44A12.1989,12.1989,0,0,0,36.11,25.04L32.55,28.6l-7.41,7.41-9.05,9.06a6.9738,6.9738,0,1,0,7.26,7.55L39.96,36.01l2.97-2.97a12.213,12.213,0,0,0,16.32-15.7Zm-41,36.55a2.6234,2.6234,0,1,1,0-3.71A2.6315,2.6315,0,0,1,18.25,53.89Z"/>
        <rect x="17.7242" y="37.9518" width="23.5085" height="1.9998" transform="translate(-18.9089 32.2531) rotate(-45)"/>
      </g>
    </SvgIcon>
  );
}