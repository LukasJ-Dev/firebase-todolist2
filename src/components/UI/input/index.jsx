import React from 'react'
import { ErrorMessage, InputLayout, InputStyle, LabelStyle } from './style'

export default function Input(props) {
  return (
    <InputLayout>
        {props.label ? <LabelStyle htmlFor={props.id} isError={props.error}>{props.label}</LabelStyle> : ""}
        <InputStyle {...props} isError={props.error} />
        {props.error ? <ErrorMessage>{props.error}</ErrorMessage> : ""}
    </InputLayout>
  )
}
