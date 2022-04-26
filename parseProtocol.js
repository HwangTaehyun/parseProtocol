const isObject = (target) => {
  if (!Array.isArray(target) && typeof target === "object" && target !== null) {
    return true;
  } else {
    return false;
  }
};

export const parseProtocols = (refObj, settings, depth, location) => {
  if (Array.isArray(settings)) {
    settings.forEach((item, index) => {
      const loc = location.concat(".").concat(`${index}`);
      parseProtocols(refObj, item, depth, loc);
    });
  } else if (isObject(settings)) {
    Object.entries(settings).forEach(([key, value]) => {
      if (Array.isArray(value) || isObject(value)) {
        // refObj.push({
        //   key: uniqid(),
        //   name: depth > 0 ? `${location}.${key}` : key,
        //   type: "subtitle",
        //   displayName: key,
        //   defaultValue: value,
        //   depth: depth,
        // });
      }
      parseProtocols(
        refObj,
        value,
        depth + 1,
        depth > 0 ? location.concat(".").concat(key) : key
      );
    });
  } else {
    if (settings.toString()?.includes("_swift")) {
      refObj.push({
        protocolName: settings,
      });
    }
  }
};
