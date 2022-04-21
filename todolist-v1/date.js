
// It's exports not export
// Exporting 1st Function
exports.getDate = function (){
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  const today = new Date();
  return today.toLocaleDateString("en-US", options);
}


// Exporting 2nd Function under same module
exports.getDay = function (){
  const options = {
    weekday: "long"
  };

  const today = new Date();
  return today.toLocaleDateString("en-US", options);
}
