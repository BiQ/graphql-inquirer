import React from 'react';
import PropTypes from 'prop-types';

const RecursiveType = (props) => {
  const {
    type
  } = props;

  let className = (type.ofType ? type.kind : 'type-name');
  let content = type.ofType
    ? <RecursiveType type={type.ofType} />
    : type.name;

  return (<span className={className}>{content}</span>);
};

RecursiveType.propTypes = {
  type: PropTypes.object
};

const RecursiveTypeString = (type) => {

  if (type.kind && type.ofType) {
    switch (type.kind) {
      case 'LIST':
        return `[${RecursiveTypeString(type.ofType)}]`;
      case 'NON_NULL':
        return `${RecursiveTypeString(type.ofType)}!`;
      default:
        return RecursiveTypeString(type.ofType);
    }
  } else if (type.name && type.name != '') {
    return type.name;
  } else {
    return '';
  }

};

const GetTypeName = (type) => {
  if (type.name != null) {
    return type.name;
  } else if (type.ofType != null) {
    return GetTypeName(type.ofType);
  } else {
    return null;
  }
};

const isList = (type) => {
  if (type && type.kind && type.kind === 'LIST') {
    return true;
  } else if (type.ofType) {
    return isList(type.ofType);
  } else {
    return false;
  }
};

const isOfKind = (type, kind) => {

  const accepted = [
    'SCALAR',
    'OBJECT',
    'INTERFACE',
    'UNION',
    'ENUM',
    'INPUT_OBJECT',
    'LIST',
    'NON_NULL'
  ];

  if (accepted.indexOf(kind) < 0) return false;

  if (type && type.kind && type.kind === kind) {
    return true;
  } else if (type.ofType) {
    return isOfKind(type.ofType, kind);
  } else {
    return false;
  }
};

const trimSlash = (str) => {
  if (!str || str === '') return '';
  while (str[str.length-1]==='/') str = str.substring(0, str.length-1);
  return str;
};

export {
  RecursiveType,
  RecursiveTypeString,
  GetTypeName,
  isList,
  isOfKind,
  trimSlash
};
