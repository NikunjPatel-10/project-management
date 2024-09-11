import {
  require_react
} from "./chunk-TWJRYSII.js";
import {
  __commonJS,
  __toESM
} from "./chunk-DC5AMYBS.js";

// node_modules/fast-deep-equal/index.js
var require_fast_deep_equal = __commonJS({
  "node_modules/fast-deep-equal/index.js"(exports, module) {
    "use strict";
    module.exports = function equal(a, b) {
      if (a === b) return true;
      if (a && b && typeof a == "object" && typeof b == "object") {
        if (a.constructor !== b.constructor) return false;
        var length, i, keys;
        if (Array.isArray(a)) {
          length = a.length;
          if (length != b.length) return false;
          for (i = length; i-- !== 0; )
            if (!equal(a[i], b[i])) return false;
          return true;
        }
        if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
        if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
        if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
        keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length) return false;
        for (i = length; i-- !== 0; )
          if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
        for (i = length; i-- !== 0; ) {
          var key = keys[i];
          if (!equal(a[key], b[key])) return false;
        }
        return true;
      }
      return a !== a && b !== b;
    };
  }
});

// node_modules/@mantine/form/esm/use-form.js
var import_react = __toESM(require_react());
var import_fast_deep_equal = __toESM(require_fast_deep_equal());

// node_modules/@mantine/form/esm/filter-errors/filter-errors.js
function filterErrors(errors) {
  if (errors === null || typeof errors !== "object") {
    return {};
  }
  return Object.keys(errors).reduce((acc, key) => {
    const errorValue = errors[key];
    if (errorValue !== void 0 && errorValue !== null && errorValue !== false) {
      acc[key] = errorValue;
    }
    return acc;
  }, {});
}

// node_modules/@mantine/form/esm/clear-list-state/clear-list-state.js
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
function clearListState(field, state) {
  if (state === null || typeof state !== "object") {
    return {};
  }
  const clone = __spreadValues({}, state);
  Object.keys(state).forEach((errorKey) => {
    if (errorKey.includes(`${String(field)}.`)) {
      delete clone[errorKey];
    }
  });
  return clone;
}

// node_modules/@mantine/form/esm/form-index.js
var FORM_INDEX = "__MANTINE_FORM_INDEX__";

// node_modules/@mantine/form/esm/validate/should-validate-on-change.js
function shouldValidateOnChange(path, validateInputOnChange) {
  if (!validateInputOnChange) {
    return false;
  }
  if (typeof validateInputOnChange === "boolean") {
    return validateInputOnChange;
  }
  if (Array.isArray(validateInputOnChange)) {
    return validateInputOnChange.includes(path.replace(/[.][0-9]/g, `.${FORM_INDEX}`));
  }
  return false;
}

// node_modules/klona/dist/index.mjs
function klona(x) {
  if (typeof x !== "object") return x;
  var k, tmp, str = Object.prototype.toString.call(x);
  if (str === "[object Object]") {
    if (x.constructor !== Object && typeof x.constructor === "function") {
      tmp = new x.constructor();
      for (k in x) {
        if (x.hasOwnProperty(k) && tmp[k] !== x[k]) {
          tmp[k] = klona(x[k]);
        }
      }
    } else {
      tmp = {};
      for (k in x) {
        if (k === "__proto__") {
          Object.defineProperty(tmp, k, {
            value: klona(x[k]),
            configurable: true,
            enumerable: true,
            writable: true
          });
        } else {
          tmp[k] = klona(x[k]);
        }
      }
    }
    return tmp;
  }
  if (str === "[object Array]") {
    k = x.length;
    for (tmp = Array(k); k--; ) {
      tmp[k] = klona(x[k]);
    }
    return tmp;
  }
  if (str === "[object Set]") {
    tmp = /* @__PURE__ */ new Set();
    x.forEach(function(val) {
      tmp.add(klona(val));
    });
    return tmp;
  }
  if (str === "[object Map]") {
    tmp = /* @__PURE__ */ new Map();
    x.forEach(function(val, key) {
      tmp.set(klona(key), klona(val));
    });
    return tmp;
  }
  if (str === "[object Date]") {
    return /* @__PURE__ */ new Date(+x);
  }
  if (str === "[object RegExp]") {
    tmp = new RegExp(x.source, x.flags);
    tmp.lastIndex = x.lastIndex;
    return tmp;
  }
  if (str === "[object DataView]") {
    return new x.constructor(klona(x.buffer));
  }
  if (str === "[object ArrayBuffer]") {
    return x.slice(0);
  }
  if (str.slice(-6) === "Array]") {
    return new x.constructor(x);
  }
  return x;
}

// node_modules/@mantine/form/esm/paths/get-splitted-path.js
function getSplittedPath(path) {
  if (typeof path !== "string") {
    return [];
  }
  return path.split(".");
}

// node_modules/@mantine/form/esm/paths/set-path.js
function setPath(path, value, values) {
  const splittedPath = getSplittedPath(path);
  if (splittedPath.length === 0) {
    return values;
  }
  const cloned = klona(values);
  if (splittedPath.length === 1) {
    cloned[splittedPath[0]] = value;
    return cloned;
  }
  let val = cloned[splittedPath[0]];
  for (let i = 1; i < splittedPath.length - 1; i += 1) {
    if (val === void 0) {
      return cloned;
    }
    val = val[splittedPath[i]];
  }
  val[splittedPath[splittedPath.length - 1]] = value;
  return cloned;
}

// node_modules/@mantine/form/esm/paths/get-path.js
function getPath(path, values) {
  const splittedPath = getSplittedPath(path);
  if (splittedPath.length === 0 || typeof values !== "object" || values === null) {
    return void 0;
  }
  let value = values[splittedPath[0]];
  for (let i = 1; i < splittedPath.length; i += 1) {
    if (value === void 0) {
      break;
    }
    value = value[splittedPath[i]];
  }
  return value;
}

// node_modules/@mantine/form/esm/validate/validate-values.js
function getValidationResults(errors) {
  const filteredErrors = filterErrors(errors);
  return { hasErrors: Object.keys(filteredErrors).length > 0, errors: filteredErrors };
}
function validateRulesRecord(rules, values, path = "", errors = {}) {
  if (typeof rules !== "object" || rules === null) {
    return errors;
  }
  return Object.keys(rules).reduce((acc, ruleKey) => {
    const rule = rules[ruleKey];
    const rulePath = `${path === "" ? "" : `${path}.`}${ruleKey}`;
    const value = getPath(rulePath, values);
    let arrayValidation = false;
    if (typeof rule === "function") {
      acc[rulePath] = rule(value, values, rulePath);
    }
    if (typeof rule === "object" && Array.isArray(value)) {
      arrayValidation = true;
      value.forEach((_item, index) => validateRulesRecord(rule, values, `${rulePath}.${index}`, acc));
    }
    if (typeof rule === "object" && typeof value === "object" && value !== null) {
      if (!arrayValidation) {
        validateRulesRecord(rule, values, rulePath, acc);
      }
    }
    return acc;
  }, errors);
}
function validateValues(validate, values) {
  if (typeof validate === "function") {
    return getValidationResults(validate(values));
  }
  return getValidationResults(validateRulesRecord(validate, values));
}

// node_modules/@mantine/form/esm/validate/validate-field-value.js
function validateFieldValue(path, rules, values) {
  if (typeof path !== "string") {
    return { hasError: false, error: null };
  }
  const results = validateValues(rules, values);
  const pathInError = Object.keys(results.errors).find((errorKey) => path.split(".").every((pathPart, i) => pathPart === errorKey.split(".")[i]));
  return { hasError: !!pathInError, error: pathInError ? results.errors[pathInError] : null };
}

// node_modules/@mantine/form/esm/paths/reorder-path.js
function reorderPath(path, { from, to }, values) {
  const currentValue = getPath(path, values);
  if (!Array.isArray(currentValue)) {
    return values;
  }
  const cloned = [...currentValue];
  const item = currentValue[from];
  cloned.splice(from, 1);
  cloned.splice(to, 0, item);
  return setPath(path, cloned, values);
}

// node_modules/@mantine/form/esm/paths/remove-path.js
function removePath(path, index, values) {
  const currentValue = getPath(path, values);
  if (!Array.isArray(currentValue)) {
    return values;
  }
  return setPath(path, currentValue.filter((_, itemIndex) => itemIndex !== index), values);
}

// node_modules/@mantine/form/esm/paths/insert-path.js
function insertPath(path, value, index, values) {
  const currentValue = getPath(path, values);
  if (!Array.isArray(currentValue)) {
    return values;
  }
  const cloned = [...currentValue];
  cloned.splice(typeof index === "number" ? index : cloned.length, 0, value);
  return setPath(path, cloned, values);
}

// node_modules/@mantine/form/esm/get-status/get-status.js
function getStatus(status, path) {
  const paths = Object.keys(status);
  if (typeof path === "string") {
    const nestedPaths = paths.filter((statusPath) => statusPath.startsWith(`${path}.`));
    return status[path] || nestedPaths.some((statusPath) => status[statusPath]) || false;
  }
  return paths.some((statusPath) => status[statusPath]);
}

// node_modules/@mantine/form/esm/get-input-on-change/get-input-on-change.js
function getInputOnChange(setValue) {
  return (val) => {
    if (!val) {
      setValue(val);
    } else if (typeof val === "function") {
      setValue(val);
    } else if (typeof val === "object" && "nativeEvent" in val) {
      const { currentTarget } = val;
      if (currentTarget instanceof HTMLInputElement) {
        if (currentTarget.type === "checkbox") {
          setValue(currentTarget.checked);
        } else {
          setValue(currentTarget.value);
        }
      } else if (currentTarget instanceof HTMLTextAreaElement || currentTarget instanceof HTMLSelectElement) {
        setValue(currentTarget.value);
      }
    } else {
      setValue(val);
    }
  };
}

// node_modules/@mantine/form/esm/use-form.js
var __defProp2 = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols2 = Object.getOwnPropertySymbols;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __propIsEnum2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp2 = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp2.call(b, prop))
      __defNormalProp2(a, prop, b[prop]);
  if (__getOwnPropSymbols2)
    for (var prop of __getOwnPropSymbols2(b)) {
      if (__propIsEnum2.call(b, prop))
        __defNormalProp2(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
function useForm({
  initialValues = {},
  initialErrors = {},
  initialDirty = {},
  initialTouched = {},
  clearInputErrorOnChange = true,
  validateInputOnChange = false,
  validateInputOnBlur = false,
  transformValues = (values) => values,
  validate: rules
} = {}) {
  const [touched, setTouched] = (0, import_react.useState)(initialTouched);
  const [dirty, setDirty] = (0, import_react.useState)(initialDirty);
  const [values, _setValues] = (0, import_react.useState)(initialValues);
  const [errors, _setErrors] = (0, import_react.useState)(filterErrors(initialErrors));
  const _dirtyValues = (0, import_react.useRef)(initialValues);
  const _setDirtyValues = (_values) => {
    _dirtyValues.current = _values;
  };
  const resetTouched = (0, import_react.useCallback)(() => setTouched({}), []);
  const resetDirty = (_values) => {
    _setDirtyValues(_values || values);
    setDirty({});
  };
  const setErrors = (0, import_react.useCallback)((errs) => _setErrors((current) => filterErrors(typeof errs === "function" ? errs(current) : errs)), []);
  const clearErrors = (0, import_react.useCallback)(() => _setErrors({}), []);
  const reset = (0, import_react.useCallback)(() => {
    _setValues(initialValues);
    clearErrors();
    resetDirty(initialValues);
    resetTouched();
  }, []);
  const setFieldError = (0, import_react.useCallback)((path, error) => setErrors((current) => __spreadProps(__spreadValues2({}, current), { [path]: error })), []);
  const clearFieldError = (0, import_react.useCallback)((path) => setErrors((current) => {
    if (typeof path !== "string") {
      return current;
    }
    const clone = __spreadValues2({}, current);
    delete clone[path];
    return clone;
  }), []);
  const clearFieldDirty = (0, import_react.useCallback)((path) => setDirty((current) => {
    if (typeof path !== "string") {
      return current;
    }
    const result = clearListState(path, current);
    delete result[path];
    return result;
  }), []);
  const setFieldValue = (0, import_react.useCallback)((path, value) => {
    const shouldValidate = shouldValidateOnChange(path, validateInputOnChange);
    clearFieldDirty(path);
    setTouched((currentTouched) => __spreadProps(__spreadValues2({}, currentTouched), { [path]: true }));
    _setValues((current) => {
      const result = setPath(path, value, current);
      if (shouldValidate) {
        const validationResults = validateFieldValue(path, rules, result);
        validationResults.hasError ? setFieldError(path, validationResults.error) : clearFieldError(path);
      }
      return result;
    });
    !shouldValidate && clearInputErrorOnChange && setFieldError(path, null);
  }, []);
  const setValues = (0, import_react.useCallback)((payload) => {
    _setValues((currentValues) => {
      const valuesPartial = typeof payload === "function" ? payload(currentValues) : payload;
      return __spreadValues2(__spreadValues2({}, currentValues), valuesPartial);
    });
    clearInputErrorOnChange && clearErrors();
  }, []);
  const reorderListItem = (0, import_react.useCallback)((path, payload) => {
    clearFieldDirty(path);
    _setValues((current) => reorderPath(path, payload, current));
  }, []);
  const removeListItem = (0, import_react.useCallback)((path, index) => {
    clearFieldDirty(path);
    _setValues((current) => removePath(path, index, current));
    _setErrors((errs) => clearListState(path, errs));
  }, []);
  const insertListItem = (0, import_react.useCallback)((path, item, index) => {
    clearFieldDirty(path);
    _setValues((current) => insertPath(path, item, index, current));
  }, []);
  const validate = (0, import_react.useCallback)(() => {
    const results = validateValues(rules, values);
    _setErrors(results.errors);
    return results;
  }, [values, rules]);
  const validateField = (0, import_react.useCallback)((path) => {
    const results = validateFieldValue(path, rules, values);
    results.hasError ? setFieldError(path, results.error) : clearFieldError(path);
    return results;
  }, [values, rules]);
  const getInputProps = (path, { type = "input", withError = type === "input", withFocus = true } = {}) => {
    const onChange = getInputOnChange((value) => setFieldValue(path, value));
    const payload = { onChange };
    if (withError) {
      payload.error = errors[path];
    }
    if (type === "checkbox") {
      payload.checked = getPath(path, values);
    } else {
      payload.value = getPath(path, values);
    }
    if (withFocus) {
      payload.onFocus = () => setTouched((current) => __spreadProps(__spreadValues2({}, current), { [path]: true }));
      payload.onBlur = () => {
        if (shouldValidateOnChange(path, validateInputOnBlur)) {
          const validationResults = validateFieldValue(path, rules, values);
          validationResults.hasError ? setFieldError(path, validationResults.error) : clearFieldError(path);
        }
      };
    }
    return payload;
  };
  const onSubmit = (handleSubmit, handleValidationFailure) => (event) => {
    event == null ? void 0 : event.preventDefault();
    const results = validate();
    if (results.hasErrors) {
      handleValidationFailure == null ? void 0 : handleValidationFailure(results.errors, values, event);
    } else {
      handleSubmit(transformValues(values), event);
    }
  };
  const onReset = (0, import_react.useCallback)((event) => {
    event.preventDefault();
    reset();
  }, []);
  const isDirty = (path) => {
    if (path) {
      const overridenValue = getPath(path, dirty);
      if (typeof overridenValue === "boolean") {
        return overridenValue;
      }
      const sliceOfValues = getPath(path, values);
      const sliceOfInitialValues = getPath(path, _dirtyValues.current);
      return !(0, import_fast_deep_equal.default)(sliceOfValues, sliceOfInitialValues);
    }
    const isOverridden = Object.keys(dirty).length > 0;
    if (isOverridden) {
      return getStatus(dirty);
    }
    return !(0, import_fast_deep_equal.default)(values, _dirtyValues.current);
  };
  const isTouched = (0, import_react.useCallback)((path) => getStatus(touched, path), [touched]);
  const isValid = (0, import_react.useCallback)((path) => path ? !validateFieldValue(path, rules, values).hasError : !validateValues(rules, values).hasErrors, [values, rules]);
  return {
    values,
    errors,
    setValues,
    setErrors,
    setFieldValue,
    setFieldError,
    clearFieldError,
    clearErrors,
    reset,
    validate,
    validateField,
    reorderListItem,
    removeListItem,
    insertListItem,
    getInputProps,
    onSubmit,
    onReset,
    isDirty,
    isTouched,
    setTouched,
    setDirty,
    resetTouched,
    resetDirty,
    isValid
  };
}

// node_modules/@mantine/form/esm/FormProvider/FormProvider.js
var import_react2 = __toESM(require_react());
function createFormContext() {
  const FormContext = (0, import_react2.createContext)(null);
  function FormProvider({ form, children }) {
    return import_react2.default.createElement(FormContext.Provider, {
      value: form
    }, children);
  }
  function useFormContext() {
    const ctx = (0, import_react2.useContext)(FormContext);
    if (!ctx) {
      throw new Error("useFormContext was called outside of FormProvider context");
    }
    return ctx;
  }
  return [FormProvider, useFormContext, useForm];
}

// node_modules/@mantine/form/esm/resolvers/zod-resolver/zod-resolver.js
function zodResolver(schema) {
  return (values) => {
    const parsed = schema.safeParse(values);
    if (parsed.success) {
      return {};
    }
    const results = {};
    parsed.error.errors.forEach((error) => {
      results[error.path.join(".")] = error.message;
    });
    return results;
  };
}

// node_modules/@mantine/form/esm/resolvers/superstruct-resolver/superstruct-resolver.js
function superstructResolver(schema) {
  function structValidation(values) {
    const formErrors = {};
    const [err] = schema.validate(values);
    if (!err) {
      return formErrors;
    }
    err.failures().forEach((fieldFailure) => {
      const fieldName = fieldFailure.path.join(" ");
      formErrors[fieldFailure.path.join(".")] = `${fieldName}: ${fieldFailure.message}`;
    });
    return formErrors;
  }
  return structValidation;
}

// node_modules/@mantine/form/esm/resolvers/yup-resolver/yup-resolver.js
function yupResolver(schema) {
  const _schema = schema;
  return (values) => {
    try {
      _schema.validateSync(values, { abortEarly: false });
      return {};
    } catch (_yupError) {
      const yupError = _yupError;
      const results = {};
      yupError.inner.forEach((error) => {
        results[error.path.replaceAll("[", ".").replaceAll("]", "")] = error.message;
      });
      return results;
    }
  };
}

// node_modules/@mantine/form/esm/resolvers/joi-resolver/joi-resolver.js
var __defProp3 = Object.defineProperty;
var __getOwnPropSymbols3 = Object.getOwnPropertySymbols;
var __hasOwnProp3 = Object.prototype.hasOwnProperty;
var __propIsEnum3 = Object.prototype.propertyIsEnumerable;
var __defNormalProp3 = (obj, key, value) => key in obj ? __defProp3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues3 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp3.call(b, prop))
      __defNormalProp3(a, prop, b[prop]);
  if (__getOwnPropSymbols3)
    for (var prop of __getOwnPropSymbols3(b)) {
      if (__propIsEnum3.call(b, prop))
        __defNormalProp3(a, prop, b[prop]);
    }
  return a;
};
function joiResolver(schema, options) {
  const _schema = schema;
  return (values) => {
    const parsed = _schema.validate(values, __spreadValues3({ abortEarly: false }, options));
    if (!parsed.error) {
      return {};
    }
    const results = {};
    parsed.error.details.forEach((error) => {
      results[error.path.join(".")] = error.message;
    });
    return results;
  };
}

// node_modules/@mantine/form/esm/validators/is-not-empty/is-not-empty.js
function isNotEmpty(error) {
  const _error = error || true;
  return (value) => {
    if (typeof value === "string") {
      return value.trim().length > 0 ? null : _error;
    }
    if (Array.isArray(value)) {
      return value.length > 0 ? null : _error;
    }
    if (value === null || value === void 0) {
      return _error;
    }
    if (value === false) {
      return _error;
    }
    return null;
  };
}

// node_modules/@mantine/form/esm/validators/matches/matches.js
function matches(regexp, error) {
  const _error = error || true;
  return (value) => {
    if (typeof value !== "string") {
      return _error;
    }
    return regexp.test(value) ? null : _error;
  };
}

// node_modules/@mantine/form/esm/validators/is-email/is-email.js
function isEmail(error) {
  return matches(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,63})+$/, error);
}

// node_modules/@mantine/form/esm/validators/has-length/has-length.js
function isLengthValid(payload, value) {
  if (typeof payload === "number") {
    return value.length === payload;
  }
  const { max, min } = payload;
  let valid = true;
  if (typeof max === "number" && value.length > max) {
    valid = false;
  }
  if (typeof min === "number" && value.length < min) {
    valid = false;
  }
  return valid;
}
function hasLength(payload, error) {
  const _error = error || true;
  return (value) => {
    if (typeof value === "string") {
      return isLengthValid(payload, value.trim()) ? null : _error;
    }
    if (typeof value === "object" && value !== null && "length" in value) {
      return isLengthValid(payload, value) ? null : _error;
    }
    return _error;
  };
}

// node_modules/@mantine/form/esm/validators/is-in-range/is-in-range.js
function isInRange({ min, max }, error) {
  const _error = error || true;
  return (value) => {
    if (typeof value !== "number") {
      return _error;
    }
    let valid = true;
    if (typeof min === "number" && value < min) {
      valid = false;
    }
    if (typeof max === "number" && value > max) {
      valid = false;
    }
    return valid ? null : _error;
  };
}
export {
  FORM_INDEX,
  createFormContext,
  hasLength,
  isEmail,
  isInRange,
  isNotEmpty,
  joiResolver,
  matches,
  superstructResolver,
  useForm,
  yupResolver,
  zodResolver
};
//# sourceMappingURL=@mantine_form.js.map
