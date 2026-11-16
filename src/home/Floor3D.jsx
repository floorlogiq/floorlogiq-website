import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { ZONES, HubCapsule } from './hub'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'

const RED = 0xcc1f1f, RED_D = 0x9f1717, INK = 0x16161e, NAVY = 0x2b3147, STEEL = 0xc9ced9, TAN = 0xd8a868, WOOD = 0xb98a4e, WHITE = 0xffffff, AMBER = 0xf5a80b, GREEN = 0x1f9d63, GLASS = 0x263149
const PI = Math.PI

const HUB = new THREE.Vector3(1.2, 14, 1.2)
/* resting view: the floor is turned 7 degrees so it reads narrower and can be drawn larger */
const BASE_ROT = -.122, FIT_W = 14.25, FIT_H = 11.5, FIT_X = -.46
/* ── small building blocks ── */
const mats = new Map()
const mat = (color, o) => {
  if (o) return new THREE.MeshStandardMaterial({ color, roughness:.7, metalness:.05, ...o })
  if (!mats.has(color)) mats.set(color, new THREE.MeshStandardMaterial({ color, roughness:.7, metalness:.05 }))
  return mats.get(color)
}
const lit = m => { m.castShadow = true; m.receiveShadow = true; return m }
function box(w, h, d, color, x, y, z, o) {
  const m = lit(new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat(color, o))); m.position.set(x, y, z); return m
}
function rbox(w, h, d, color, x, y, z, r = .07, o) {
  const rad = Math.max(.005, Math.min(r, Math.min(w, h, d) / 2 - .002))
  const m = lit(new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 2, rad), mat(color, o))); m.position.set(x, y, z); return m
}
function cyl(r, h, color, x, y, z, axis = 'y', o) {
  const m = lit(new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, 22), mat(color, o))); m.position.set(x, y, z)
  if (axis === 'z') m.rotation.x = PI / 2
  if (axis === 'x') m.rotation.z = PI / 2
  return m
}
function ball(r, color, x, y, z, o) {
  const m = lit(new THREE.Mesh(new THREE.SphereGeometry(r, 20, 16), mat(color, o))); m.position.set(x, y, z); return m
}
const glowing = color => ({ emissive:color, emissiveIntensity:1.4 })

/* a canvas drawn once (or redrawn) and shown as a lit-up screen */
function screen(draw, w = 256, h = 160) {
  const c = document.createElement('canvas'); c.width = w; c.height = h
  const g = c.getContext('2d'); draw(g, w, h, 0)
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace
  return { tex, redraw: t => { draw(g, w, h, t); tex.needsUpdate = true } }
}
function panel(w, h, tex, x, y, z, ry = 0) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map:tex }))
  m.position.set(x, y, z); m.rotation.y = ry; return m
}
const pill = (g, x, y, w, h, r) => { g.beginPath(); if (g.roundRect) g.roundRect(x, y, w, h, r); else g.rect(x, y, w, h); g.fill() }  // older browsers have no roundRect
const drawHmi = (g, w, h) => {
  g.fillStyle = '#151823'; g.fillRect(0, 0, w, h)
  g.fillStyle = '#cc1f1f'; g.fillRect(0, 0, w, 30)
  g.fillStyle = '#ffffff'; pill(g, 12, 9, 90, 12, 6)
  g.fillStyle = '#3a4058'; pill(g, 14, 46, 150, 14, 7); pill(g, 14, 72, 110, 14, 7)
  g.fillStyle = '#2a2f45'; pill(g, 14, 110, 228, 26, 13)
  g.fillStyle = '#1f9d63'; pill(g, 14, 110, 160, 26, 13)
  g.beginPath(); g.arc(214, 66, 22, 0, PI * 2); g.fill()
}
const drawAndon = (g, w, h, t) => {
  g.fillStyle = '#151823'; g.fillRect(0, 0, w, h)
  g.fillStyle = '#1f9d63'; pill(g, 16, 18, 96, h - 36, 14)
  g.fillStyle = '#ffffff'; pill(g, 34, 40, 60, 12, 6); pill(g, 34, 62, 40, 12, 6)
  for (let i = 0; i < 9; i++) {
    const v = .35 + .6 * (Math.sin(t * .9 + i * 1.3) * .5 + .5), bh = (h - 44) * v
    g.fillStyle = i === 6 ? '#f5a80b' : i === 2 ? '#cc1f1f' : '#35d07f'
    pill(g, 136 + i * 40, h - 20 - bh, 26, bh, 6)
  }
}
const drawPass = (g, w, h) => {
  g.fillStyle = '#151823'; g.fillRect(0, 0, w, h)
  g.fillStyle = '#1f9d63'; g.beginPath(); g.arc(w / 2, h / 2 - 8, 46, 0, PI * 2); g.fill()
  g.strokeStyle = '#fff'; g.lineWidth = 12; g.lineCap = 'round'; g.lineJoin = 'round'
  g.beginPath(); g.moveTo(w / 2 - 22, h / 2 - 8); g.lineTo(w / 2 - 6, h / 2 + 10); g.lineTo(w / 2 + 24, h / 2 - 24); g.stroke()
  g.fillStyle = '#3a4058'; pill(g, w / 2 - 50, h - 30, 100, 12, 6)
}
let glowTex
function glowMap() {
  if (!glowTex) {
    const c = document.createElement('canvas'); c.width = c.height = 128
    const g = c.getContext('2d'), gr = g.createRadialGradient(64, 64, 0, 64, 64, 64)
    gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(.4, 'rgba(255,255,255,.45)'); gr.addColorStop(1, 'rgba(255,255,255,0)')
    g.fillStyle = gr; g.fillRect(0, 0, 128, 128); glowTex = new THREE.CanvasTexture(c)
  }
  return glowTex
}
function glow(color, scale, opacity) {
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map:glowMap(), color, transparent:true, opacity, depthWrite:false }))
  s.scale.setScalar(scale); return s
}

/* ── a floor worker: hard hat, moving arms and legs. Faces +z. ── */
function person({ shirt = WHITE, pants = NAVY, hat = WHITE, skin = 0xe2b08a, band }) {
  const g = new THREE.Group()
  const limb = (x, y, w, h, d, color, end) => { const p = new THREE.Group(); p.position.set(x, y, 0); p.add(rbox(w, h, d, color, 0, -h / 2, 0, .05), end(h)); g.add(p); return p }
  const shoe = h => rbox(.19, .1, .3, INK, 0, -h + .03, .04, .04), hand = h => ball(.085, skin, 0, -h - .04, 0)
  const legL = limb(-.12, .64, .18, .64, .21, pants, shoe), legR = limb(.12, .64, .18, .64, .21, pants, shoe)
  g.add(rbox(.52, .6, .3, shirt, 0, .95, 0, .1))
  if (band) g.add(box(.535, .1, .315, band, 0, 1.0, 0), box(.535, .05, .315, band, 0, .82, 0))
  const armL = limb(-.33, 1.2, .14, .5, .16, shirt, hand), armR = limb(.33, 1.2, .14, .5, .16, shirt, hand)
  const head = new THREE.Group(); head.position.y = 1.44
  const cap = lit(new THREE.Mesh(new THREE.SphereGeometry(.205, 20, 12, 0, PI * 2, 0, PI / 2), mat(hat))); cap.position.y = .03
  head.add(ball(.18, skin, 0, 0, 0), cap, cyl(.25, .035, hat, 0, .045, .05)); g.add(head)
  return { g, legL, legR, armL, armR, head }
}
const stride = (p, t, rate = 7, amp = .55) => {
  const s = Math.sin(t * rate)
  p.legL.rotation.x = s * amp; p.legR.rotation.x = -s * amp; p.armL.rotation.x = -s * amp * .8; p.armR.rotation.x = s * amp * .8
  p.g.position.y = Math.abs(Math.cos(t * rate)) * .035
}
const stand = p => { p.legL.rotation.x = p.legR.rotation.x = p.armL.rotation.x = p.armR.rotation.x = 0; p.g.position.y = 0 }
const ss = (a, b, x) => { const u = Math.min(1, Math.max(0, (x - a) / (b - a))); return u * u * (3 - 2 * u) }

function buildScene(root, state) {
  const anim = []            // per-frame callbacks (t in seconds)
  const add = (...m) => root.add(...m)

  /* ── platform, soft ground shadow, zone pads, walkway ── */
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(31.5, 22), new THREE.MeshBasicMaterial({ map:glowMap(), color:0x16161e, transparent:true, opacity:.2, depthWrite:false }))
  ground.rotation.x = -PI / 2; ground.position.set(-.75, -1.15, 0); add(ground)
  const floor = rbox(24.1, .6, 15.6, 0xf3f4f8, -.75, -.3, 0, .16); floor.castShadow = false; add(floor)
  const rim = rbox(24.5, .3, 16, 0xdfe2ea, -.75, -.72, 0, .12); rim.castShadow = false; add(rim)

  const pads = {}
  ZONES.forEach((z, i) => {
    const [w, d, x, zz] = z.pad
    const p = new THREE.Mesh(new THREE.PlaneGeometry(w, d), new THREE.MeshStandardMaterial({ color:WHITE, roughness:1 }))
    p.rotation.x = -PI / 2; p.position.set(x, .012, zz); p.receiveShadow = true
    const fill = new THREE.Mesh(new THREE.PlaneGeometry(w, d), new THREE.MeshBasicMaterial({ color:RED, transparent:true, opacity:0, depthWrite:false }))
    fill.rotation.x = -PI / 2; fill.position.set(x, .018, zz)
    const edge = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.PlaneGeometry(w, d)), new THREE.LineBasicMaterial({ color: i % 2 ? INK : RED }))
    edge.rotation.x = -PI / 2; edge.position.set(x, .024, zz)
    add(p, fill, edge); pads[z.key] = { fill, edge, base: i % 2 ? INK : RED }
  })
  // pedestrian walkway between the zones
  const lane = new THREE.Mesh(new THREE.PlaneGeometry(15.4, .62), new THREE.MeshStandardMaterial({ color:0xfff3cc, roughness:1 }))
  lane.rotation.x = -PI / 2; lane.position.set(1.6, .013, .44); lane.receiveShadow = true; add(lane)
  for (let x = -5.9; x < 9.2; x += .9) for (const z of [.13, .75]) {
    const dash = new THREE.Mesh(new THREE.PlaneGeometry(.52, .07), new THREE.MeshBasicMaterial({ color:AMBER }))
    dash.rotation.x = -PI / 2; dash.position.set(x, .02, z); add(dash)
  }

  /* ── warehouse shell: dock wall with a door, back wall behind the racks ── */
  const WALL = 0xfafbfd
  add(box(.2, 3.6, 7.85, WALL, -12.6, 1.8, -3.775), box(.2, 3.6, 1.25, WALL, -12.6, 1.8, 2.975), box(.2, 1.0, 2.3, WALL, -12.6, 3.1, 1.2))
  add(box(.26, 2.6, .14, RED, -12.56, 1.3, .05), box(.26, 2.6, .14, RED, -12.56, 1.3, 2.35), box(.26, .14, 2.44, RED, -12.56, 2.6, 1.2))
  add(box(.22, .2, 11.5, RED, -12.6, 3.7, -1.95), box(9.8, 3.6, .2, WALL, -7.8, 1.8, -7.7), box(9.8, .2, .22, RED, -7.8, 3.7, -7.7))

  /* ── racks with cartons ── */
  const cartons = [TAN, 0xcf9d5c, 0xe2b77c]
  for (let r = 0; r < 3; r++) {
    const z = -6 + r * 2.2
    for (const x of [-10.6, -8.2, -5.8]) add(box(.14, 3.4, .14, INK, x, 1.7, z), box(.14, 3.4, .14, INK, x, 1.7, z + .9))
    for (let lv = 0; lv < 3; lv++) {
      const y = .5 + lv * 1.05
      add(box(5, .08, 1, STEEL, -8.2, y, z + .45))
      for (let i = 0; i < 5; i++) {
        if ((i + lv + r) % 4 === 3) continue
        add(rbox(.74, .6, .72, (i * 3 + lv + r) % 7 === 0 ? RED : cartons[(i + lv * 2 + r) % 3], -10.2 + i, y + .34, z + .45, .05))
      }
    }
  }
  // staged pallets by the dock
  const pallet = (x, z, n) => {
    add(rbox(1.3, .14, 1.1, WOOD, x, .07, z, .03))
    for (let i = 0; i < n; i++) add(rbox(.56, .44, .48, cartons[i % 3], x - .3 + (i % 2) * .6, .36 + (i > 3 ? .45 : 0), z - .27 + (((i / 2) | 0) % 2) * .54, .04))
  }
  pallet(-10.6, 4.3, 6); pallet(-8.6, 4.0, 4)

  /* ── truck backed into the dock ── */
  add(rbox(3.6, 2.05, 1.95, WHITE, -10.45, 1.3, 1.2, .1), box(3.62, .16, 1.97, RED, -10.45, .7, 1.2))
  add(rbox(1.25, 1.6, 1.9, RED, -7.95, 1.05, 1.2, .18), box(.05, .58, 1.5, GLASS, -7.315, 1.42, 1.2, { roughness:.2 }), box(.6, .48, .05, GLASS, -7.85, 1.46, 2.155, { roughness:.2 }))
  add(box(.08, .2, 1.94, INK, -7.3, .38, 1.2), box(.06, .14, .3, 0xfff1c2, -7.3, .68, .52, glowing(0xffe9a8)), box(.06, .14, .3, 0xfff1c2, -7.3, .68, 1.88, glowing(0xffe9a8)))
  for (const x of [-11.6, -10.6, -7.95]) add(cyl(.36, 2.05, INK, x, .36, 1.2, 'z'), cyl(.16, 2.09, STEEL, x, .36, 1.2, 'z'))

  /* ── production line: conveyor, two machines, robot, andon board ── */
  add(rbox(11, .5, 1.3, INK, 2, .45, -2.6, .06), box(11, .08, 1.06, 0x3a3d4a, 2, .74, -2.6), box(11, .1, .08, STEEL, 2, .8, -1.98), box(11, .1, .08, STEEL, 2, .8, -3.22))
  for (const x of [-3.2, -1.4, 2.4, 6.4, 7.2]) add(box(.16, .45, 1.2, STEEL, x, .22, -2.6))
  const parcels = []
  for (let i = 0; i < 6; i++) { const p = rbox(.7, .55, .7, i % 3 === 0 ? RED : cartons[i % 3], 0, 1.07, -2.6, .05); parcels.push(p); add(p) }
  anim.push(t => parcels.forEach((p, i) => { p.position.x = -3.2 + ((t * .9 + i * 1.83) % 11) }))

  const hmi = screen(drawHmi)
  const machine = x => {
    add(rbox(2, 2.1, 2.3, WHITE, x, 1.6, -2.6, .12), rbox(2.05, .28, 2.35, RED, x, 2.2, -2.6, .05), rbox(1.25, .86, .08, INK, x - .12, 1.55, -1.44, .04))
    add(panel(1.08, .7, hmi.tex, x - .12, 1.55, -1.395))
    for (let k = 0; k < 3; k++) add(box(.04, .07, 1.3, 0x9aa1b3, x + 1.005, 1.15 + k * .2, -2.6))
    add(cyl(.34, .5, STEEL, x - .35, 2.9, -3.0), cyl(.44, .1, INK, x - .35, 3.18, -3.0))
    // stack light
    add(cyl(.035, .5, INK, x + .72, 2.9, -3.3), cyl(.1, .14, 0x7a1a1a, x + .72, 3.2, -3.3), cyl(.1, .14, 0x8a6a1a, x + .72, 3.35, -3.3), cyl(.1, .14, GREEN, x + .72, 3.5, -3.3, 'y', glowing(GREEN)))
    const g = glow(0x35d07f, .9, .55); g.position.set(x + .72, 3.5, -3.3); add(g)
  }
  machine(.2); machine(4.6)

  // robot arm at the end of the line
  const arm = new THREE.Group(); arm.position.set(7.6, 0, -2.6)
  arm.add(cyl(.55, .3, INK, 0, .15, 0), cyl(.34, .3, STEEL, 0, .45, 0))
  const upper = new THREE.Group(); upper.position.y = .6; arm.add(upper)
  upper.add(rbox(.32, 1.7, .32, RED, 0, .85, 0, .1), ball(.24, INK, 0, 0, 0), ball(.22, INK, 0, 1.7, 0))
  const fore = new THREE.Group(); fore.position.y = 1.7; upper.add(fore)
  fore.add(rbox(1.5, .26, .26, RED, -.62, 0, 0, .08), rbox(.3, .46, .3, INK, -1.3, -.22, 0, .05), box(.06, .26, .06, STEEL, -1.4, -.56, -.1), box(.06, .26, .06, STEEL, -1.2, -.56, .1))
  add(arm)
  anim.push(t => { arm.rotation.y = Math.sin(t * .8) * .9; upper.rotation.z = Math.sin(t * .8 + 1) * .12; fore.rotation.z = Math.sin(t * 1.6) * .28 - .1 })

  // andon board behind the line
  const andon = screen(drawAndon, 512, 150)
  add(box(.12, 4.2, .12, INK, 3.3, 2.1, -4.9), box(.12, 4.2, .12, INK, 7.5, 2.1, -4.9), rbox(4.7, 1.45, .14, INK, 5.4, 4.0, -4.9, .06), panel(4.46, 1.22, andon.tex, 5.4, 4.0, -4.82))
  let lastDraw = -1
  anim.push(t => { if (t - lastDraw > .25) { lastDraw = t; andon.redraw(t) } })

  /* ── inspection station ── */
  add(rbox(2.6, .14, 1.4, STEEL, 8.2, 1, 3.4, .04))
  for (const [x, z] of [[7.1, 2.9], [9.3, 2.9], [7.1, 3.9], [9.3, 3.9]]) add(box(.12, 1, .12, INK, x, .5, z))
  add(rbox(.18, 2.4, .18, RED, 6.9, 1.2, 3.4, .05), rbox(.18, 2.4, .18, RED, 9.5, 1.2, 3.4, .05), rbox(2.78, .18, .18, RED, 8.2, 2.4, 3.4, .05), rbox(.4, .22, .3, INK, 8.2, 2.22, 3.4, .04))
  add(rbox(.7, .5, .6, TAN, 8.2, 1.33, 3.4, .05))
  const beam = new THREE.Mesh(new THREE.PlaneGeometry(2.4, .05), new THREE.MeshBasicMaterial({ color:RED, transparent:true, opacity:.85, side:THREE.DoubleSide }))
  beam.position.set(8.2, 1.4, 3.4); add(beam)
  anim.push(t => { beam.position.y = 1.25 + (Math.sin(t * 2.2) * .5 + .5) * .95 })
  const pass = screen(drawPass, 200, 150)
  add(rbox(1.3, .95, .1, INK, 10.1, 1.95, 5.3, .05), panel(1.16, .82, pass.tex, 10.1, 1.95, 5.356), box(.1, 1.5, .1, INK, 10.1, .75, 5.3), cyl(.3, .06, INK, 10.1, .03, 5.3))

  /* ── maintenance bay ── */
  add(rbox(2.2, 1.5, 1.8, WHITE, -3.6, .75, 5.2, .1), rbox(2.25, .22, 1.85, INK, -3.6, 1.2, 5.2, .04), rbox(.05, .8, .7, 0x3a3d4a, -2.49, .62, 5.0, .02))
  add(rbox(.95, .5, .55, RED, -1.2, .55, 6.2, .06), box(.8, .04, .45, INK, -1.2, .81, 6.2))
  for (const [x, z] of [[-1.58, 6.0], [-.82, 6.0], [-1.58, 6.4], [-.82, 6.4]]) add(cyl(.07, .06, INK, x, .07, z, 'z'), box(.05, .26, .05, INK, x, .2, z))
  const cone = (x, z) => { const c = lit(new THREE.Mesh(new THREE.ConeGeometry(.17, .5, 18), mat(RED))); c.position.set(x, .27, z); add(c, box(.42, .04, .42, INK, x, .02, z)) }
  cone(-1.5, 4.0); cone(-2.9, 6.8)
  const amber = ball(.2, AMBER, -3.6, 1.85, 5.2, { emissive:AMBER, emissiveIntensity:1.5 }), amberGlow = glow(AMBER, 2.2, 0)
  amberGlow.position.copy(amber.position); add(amber, amberGlow, box(.07, .3, .07, INK, -3.6, 1.62, 5.2))
  anim.push(t => { const on = Math.sin(t * 5) > 0; amber.material.emissiveIntensity = on ? 2.1 : .4; amberGlow.material.opacity = on ? .6 : 0 })

  /* ── the people ── */
  // picker: walks the rack face, stops and scans
  const picker = person({ shirt:0xf2f3f7, band:RED, hat:RED }); picker.g.position.set(-10.4, 0, -.2); picker.g.rotation.y = PI / 2
  picker.armR.add(rbox(.1, .16, .22, INK, 0, -.6, .06, .03))
  const scan = new THREE.Mesh(new THREE.BoxGeometry(.03, .7, .03), new THREE.MeshBasicMaterial({ color:RED, transparent:true, opacity:.8 })); scan.position.set(0, -1.05, .06); picker.armR.add(scan)
  add(picker.g)
  anim.push(t => {
    const u = t % 16, x0 = -10.4, x1 = -5.3
    let x, face, busy = false
    if (u < 5) { x = x0 + (x1 - x0) * u / 5; face = PI / 2 }
    else if (u < 8) { x = x1; face = PI; busy = true }
    else if (u < 13) { x = x1 - (x1 - x0) * (u - 8) / 5; face = 1.5 * PI }
    else { x = x0; face = PI; busy = true }
    picker.g.position.x = x; picker.g.rotation.y += (face - picker.g.rotation.y) * .14
    if (busy) { stand(picker); picker.armR.rotation.x = -1.25; scan.visible = Math.sin(t * 9) > -.3 } else { stride(picker, t); scan.visible = false }
  })

  // supervisor: walks the aisle with a tablet
  const sup = person({ shirt:0x4a5168, hat:WHITE, skin:0xc68a5e }); sup.g.position.set(-4.4, 0, .44); sup.g.rotation.y = PI / 2
  sup.armL.add(rbox(.3, .03, .4, INK, .12, -.56, .1, .01)); add(sup.g)
  anim.push(t => {
    const u = t % 20, x0 = -4.4, x1 = 4.6
    let x, face, busy = false
    if (u < 8.6) { x = x0 + (x1 - x0) * u / 8.6; face = PI / 2 }
    else if (u < 10) { x = x1; face = PI; busy = true }
    else if (u < 18.6) { x = x1 - (x1 - x0) * (u - 10) / 8.6; face = 1.5 * PI }
    else { x = x0; face = PI; busy = true }
    sup.g.position.x = x; sup.g.rotation.y += (face - sup.g.rotation.y) * .14
    if (busy) { stand(sup); sup.armR.rotation.x = -1.0 + Math.sin(t * 5) * .12 } else stride(sup, t)
    sup.armL.rotation.x = -1.0; sup.head.rotation.x = busy ? .25 : 0
  })

  // operator at the first machine's screen
  const op = person({ shirt:NAVY, hat:WHITE, skin:0x8d5a3b, pants:0x3a3d4a }); op.g.position.set(.1, 0, -.72); op.g.rotation.y = PI; add(op.g)
  anim.push(t => { op.armR.rotation.x = -1.25 + Math.sin(t * 3.2) * .16; op.head.rotation.y = Math.sin(t * .6) * .25 })

  // inspector with a tablet at the gate
  const insp = person({ shirt:WHITE, band:0xdfe2ea, hat:WHITE, skin:0xe8c19c }); insp.g.position.set(8.2, 0, 4.7); insp.g.rotation.y = PI
  insp.armL.rotation.x = insp.armR.rotation.x = -.95
  insp.g.add(rbox(.5, .03, .34, INK, 0, 1.02, .42, .01)); add(insp.g)
  anim.push(t => { insp.head.rotation.x = .22 + Math.sin(t * 1.1) * .12 })

  // technician working on the stopped machine
  const tech = person({ shirt:RED, pants:RED_D, hat:AMBER, skin:0xd7a07a }); tech.g.position.set(-1.95, 0, 5.05); tech.g.rotation.y = -PI / 2
  tech.armR.add(box(.06, .36, .06, STEEL, 0, -.7, 0)); add(tech.g)
  anim.push(t => { tech.armR.rotation.x = -1.1 + Math.sin(t * 6) * .28; tech.armL.rotation.x = -.7; tech.head.rotation.x = .2 })

  /* ── forklift shuttling between dock and line, with a driver ── */
  const lift = new THREE.Group()
  lift.add(rbox(1.5, .5, .95, INK, 0, .5, 0, .1), rbox(.5, .72, .95, RED, -.6, .76, 0, .12), rbox(.42, .12, .5, 0x3a3d4a, -.15, .82, 0, .04))
  for (const x of [-.5, .36]) for (const z of [-.42, .42]) lift.add(box(.06, 1.1, .06, INK, x, 1.36, z))
  lift.add(rbox(1.0, .06, .96, INK, -.07, 1.93, 0, .02), box(.09, 2.1, .09, STEEL, .82, 1.1, -.28), box(.09, 2.1, .09, STEEL, .82, 1.1, .28), box(.07, .08, .6, STEEL, .82, 2.1, 0))
  for (const x of [-.5, .5]) for (const z of [-.5, .5]) lift.add(cyl(.26, .18, INK, x, .26, z, 'z'), cyl(.1, .2, STEEL, x, .26, z, 'z'))
  const carriage = new THREE.Group()
  carriage.add(box(.9, .06, .14, STEEL, 1.32, 0, -.22), box(.9, .06, .14, STEEL, 1.32, 0, .22), box(.06, .5, .8, INK, .9, .26, 0), rbox(.7, .6, .7, TAN, 1.34, .34, 0, .05))
  lift.add(carriage)
  const driver = person({ shirt:0xf2f3f7, band:AMBER, hat:RED, skin:0xb97a56 }); driver.g.scale.setScalar(.82); driver.g.position.set(-.12, .36, 0); driver.g.rotation.y = PI / 2
  driver.legL.rotation.x = driver.legR.rotation.x = -1.35; driver.armL.rotation.x = driver.armR.rotation.x = -1.0
  const beacon = ball(.08, AMBER, -.07, 2.02, 0, glowing(AMBER))
  lift.add(driver.g, beacon); add(lift)
  anim.push(t => {
    const u = (t * .13) % 2, f = u < 1 ? u : 2 - u, e = f * f * (3 - 2 * f), uu = u < .06 ? u + 2 : u
    lift.position.set(-5.2 + e * 10, 0, 1.5)
    lift.rotation.y = PI * ss(.94, 1.06, uu) + PI * ss(1.94, 2.06, uu)
    carriage.position.y = .22 + ss(.8, 1, f) * .5 + ss(.2, 0, f) * .5
    beacon.material.emissiveIntensity = Math.sin(t * 8) > 0 ? 2 : .3
  })

  /* ── AGV carrying finished parts from the line to inspection ── */
  const agv = new THREE.Group()
  agv.add(rbox(.9, .26, 1.2, INK, 0, .2, 0, .08), box(.92, .05, 1.22, RED, 0, .34, 0), rbox(.6, .5, .6, TAN, 0, .62, 0, .05))
  const agvLamp = ball(.06, GREEN, .34, .4, .5, glowing(GREEN)); agv.add(agvLamp); add(agv)
  anim.push(t => { const u = (t * .1) % 2, f = u < 1 ? u : 2 - u; agv.position.set(5.9, 0, -.9 + f * f * (3 - 2 * f) * 4.1); agvLamp.material.emissiveIntensity = .6 + (Math.sin(t * 6) > 0 ? 1.4 : 0) })

  /* ── the hub: every zone reports upward to one live model ── */
  // a soft glow behind the logo badge (the badge itself is HTML); the links from every zone meet here
  const hub = glow(RED, 7, .2); hub.position.copy(HUB); add(hub)

  const links = {}, pulses = []
  ZONES.forEach((z, zi) => {
    const a = new THREE.Vector3(...z.at)
    const mid = a.clone().lerp(HUB, .5); mid.y += 1.6
    const curve = new THREE.QuadraticBezierCurve3(a, mid, HUB)
    const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 48, .035, 6), new THREE.MeshBasicMaterial({ color: zi % 2 ? INK : RED, transparent:true, opacity:.35 }))
    add(tube); links[z.key] = { tube, base: zi % 2 ? INK : RED }
    for (let k = 0; k < 3; k++) {
      const down = k === 2
      const dot = new THREE.Mesh(new THREE.SphereGeometry(.12, 14, 14), new THREE.MeshBasicMaterial({ color: down ? INK : RED }))
      if (!down) dot.add(glow(RED, .85, .5))
      add(dot); pulses.push({ dot, curve, off: zi * .21 + k * .33, down })
    }
  })
  anim.push(t => pulses.forEach(({ dot, curve, off, down }) => { const u = (t * .26 + off) % 1; dot.position.copy(curve.getPoint(down ? 1 - u : u)) }))

  // the zone the visitor picked lights up: pad, outline and its link to the hub
  anim.push(t => ZONES.forEach(z => {
    const on = z.key === state.active, pad = pads[z.key], link = links[z.key]
    pad.fill.material.opacity += ((on ? .08 + .06 * (Math.sin(t * 3) * .5 + .5) : 0) - pad.fill.material.opacity) * .12
    pad.edge.material.color.setHex(on ? RED : pad.base)
    link.tube.material.opacity += ((on ? .95 : .3) - link.tube.material.opacity) * .12
    link.tube.material.color.setHex(on ? RED : link.base)
  }))

  return { anim }
}

export default function Floor3D({ active, onPick, onFail }) {
  const wrap = useRef(null), canvas = useRef(null), labels = useRef([]), hubLabel = useRef(null)
  const state = useRef({ active })
  useEffect(() => { state.current.active = active }, [active])

  useEffect(() => {
    const el = wrap.current
    let renderer
    try { renderer = new THREE.WebGLRenderer({ canvas: canvas.current, antialias:true, alpha:true }) }
    catch { onFail && onFail(); return }   // WebGL off, blocked or out of contexts: the page shows the plain version
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap
    const scene = new THREE.Scene()
    const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, .1, 200)
    cam.position.set(18, 15.5, 18); cam.lookAt(0, 3.3, 0)

    scene.add(new THREE.HemisphereLight(0xffffff, 0xd9dde8, 1.25))
    const sun = new THREE.DirectionalLight(0xffffff, 1.9); sun.position.set(-9, 20, 8); sun.castShadow = true
    sun.shadow.mapSize.set(2048, 2048); sun.shadow.radius = 4
    Object.assign(sun.shadow.camera, { left:-20, right:20, top:20, bottom:-20, near:1, far:60 }); sun.shadow.bias = -.0005
    scene.add(sun)

    const root = new THREE.Group(); scene.add(root)
    const { anim } = buildScene(root, state.current)

    const size = () => {
      // fit the platform: FIT_W is half its on-screen width (plus a margin) at the resting angle, FIT_H half the scene height
      const w = el.clientWidth, h = el.clientHeight
      if (!w || !h) return
      const asp = w / h, view = Math.max(FIT_H, Math.min(19, FIT_W / asp))
      cam.left = FIT_X - view * asp; cam.right = FIT_X + view * asp; cam.top = view; cam.bottom = -view
      cam.updateProjectionMatrix(); renderer.setSize(w, h, false)
    }
    size(); const ro = new ResizeObserver(size); ro.observe(el)

    let mx = 0
    const move = e => { const r = el.getBoundingClientRect(); mx = ((e.clientX - r.left) / r.width - .5) * 2 }
    window.addEventListener('pointermove', move, { passive:true })

    const v = new THREE.Vector3(), clock = new THREE.Clock()
    let raf = 0, rot = 0, visible = true
    const still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const place = (node, p, anchor = '-100%') => {
      if (!node) return
      v.set(...p).applyMatrix4(root.matrixWorld).project(cam)
      node.style.transform = `translate(-50%,${anchor}) translate(${(v.x * .5 + .5) * el.clientWidth}px,${(-v.y * .5 + .5) * el.clientHeight}px)`
    }
    const tick = () => {
      const t = still ? 2 : clock.getElapsedTime()   // reduced motion: hold one frame of the scene, keep highlights working
      anim.forEach(f => f(t))
      rot += (((still ? 0 : Math.sin(t * .18) * .06) + mx * .09) - rot) * .05
      root.rotation.y = BASE_ROT + rot; root.updateMatrixWorld()
      renderer.render(scene, cam)
      ZONES.forEach((z, i) => place(labels.current[i], z.at))
      place(hubLabel.current, [HUB.x, HUB.y, HUB.z], '-50%')
      raf = visible ? requestAnimationFrame(tick) : 0
    }
    tick()
    // stop drawing while the hero is scrolled out of view
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible && !raf) tick()
    }, { rootMargin:'120px' })
    io.observe(el)
    return () => {
      cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); window.removeEventListener('pointermove', move)
      scene.traverse(o => {
        if (o.geometry) o.geometry.dispose()
        for (const m of [].concat(o.material || [])) { if (m.map) m.map.dispose(); m.dispose() }
      })
      renderer.dispose()
    }
  }, [])  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={wrap} style={{position:'relative',width:'100%',height:'100%'}}>
      <canvas ref={canvas} style={{position:'absolute',inset:0,width:'100%',height:'100%',display:'block'}}/>
      {/* one hub: Fuuz and the customer's ERP inside a single capsule, data moving both ways between them */}
      <div ref={hubLabel} style={{position:'absolute',left:0,top:0,width:268,height:98,pointerEvents:'none'}}>
        <HubCapsule/>
      </div>
      {ZONES.map((z, i) => {
        const on = active === z.key
        return (
          <button key={z.key} ref={n => (labels.current[i] = n)} onClick={() => onPick(z.key)} onMouseEnter={() => onPick(z.key)}
            style={{position:'absolute',left:0,top:0,whiteSpace:'nowrap',display:'flex',alignItems:'center',gap:'.5rem',background:on?'var(--red)':'#fff',color:on?'#fff':'#16161e',border:`1.5px solid ${on?'var(--red)':'#d2d6e0'}`,borderRadius:12,padding:'.45rem .8rem',fontSize:13.5,fontWeight:800,letterSpacing:'-.01em',boxShadow:on?'0 12px 28px rgba(204,31,31,.35)':'0 6px 18px rgba(10,10,10,.12)',transition:'background .2s,color .2s,box-shadow .2s,border-color .2s',cursor:'pointer'}}>
            <span style={{fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:'.12em',fontWeight:500,padding:'.12rem .4rem',borderRadius:6,background:on?'rgba(255,255,255,.2)':'rgba(204,31,31,.09)',color:on?'#fff':'var(--red)'}}>{z.tag}</span>
            <span className="f3d-name">{z.name}</span>
          </button>
        )
      })}
    </div>
  )
}
