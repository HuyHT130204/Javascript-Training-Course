const fs = require('fs'); // For the actual file reading

// Cache object to store loaded modules
const requireCache = Object.create(null);

function miniRequire(name) {
  // Return cached module if it exists
  if (name in requireCache) {
    return requireCache[name].exports;
  }
  
  // Read the file (in a real implementation)
  const code = fs.readFileSync(name, 'utf8');
  
  // Create the module object with empty exports
  const module = { exports: {} };
  
  // Add to cache BEFORE executing
  // This is key to handling cycles!
  requireCache[name] = module;
  
  // Create wrapper function for the module code
  const wrapper = Function('require, exports, module', code);
  
  // Execute the module code
  wrapper(miniRequire, module.exports, module);
  
  // Return the completed exports
  return module.exports;
}
