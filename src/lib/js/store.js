// @ts-nocheck
import ms from 'ms'
import { writable } from 'svelte/store'

export let auth = writable()

export function getAuth() {
   return auth.get();
}