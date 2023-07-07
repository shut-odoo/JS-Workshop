/** @odoo-module **/

const { useState, onWillDestroy, Component } = owl;

// We define here a custom behaviour: this hook tracks the state of the mouse
// position
export function useMouse() {
  const position = useState({ x: 0, y: 0 });

  function update(e) {
    position.x = e.clientX;
    position.y = e.clientY;
  }
  window.addEventListener("mousemove", update);
  onWillDestroy(() => {
    window.removeEventListener("mousemove", update);
  });

  return position;
}