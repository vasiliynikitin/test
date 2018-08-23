export function parseInputChange(event) {
  const target = event.target;
  const name = target.name;
  const value = target.type === 'checkbox' ? target.checked : target.value;

  return { [name]: value };
}