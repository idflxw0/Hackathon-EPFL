use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen]
pub fn verify_proof(proof: &str, verification_key: &str, restaurant_public_key: &str, time_range_start: i64, time_range_end: i64) -> bool {
    true // Mock, à remplacer par la logique réelle
}