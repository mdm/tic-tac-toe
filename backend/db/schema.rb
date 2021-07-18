# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_07_18_111916) do

  create_table "matches", force: :cascade do |t|
    t.integer "noughts_id", null: false
    t.integer "crosses_id", null: false
    t.integer "accepted_moves"
    t.boolean "finished"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["crosses_id"], name: "index_matches_on_crosses_id"
    t.index ["noughts_id"], name: "index_matches_on_noughts_id"
  end

  create_table "moves", force: :cascade do |t|
    t.integer "match_id", null: false
    t.integer "number"
    t.integer "cell"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["match_id"], name: "index_moves_on_match_id"
  end

  create_table "players", force: :cascade do |t|
    t.string "name", null: false
    t.string "password_digest", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["name"], name: "index_players_on_name", unique: true
  end

  add_foreign_key "matches", "players", column: "crosses_id"
  add_foreign_key "matches", "players", column: "noughts_id"
  add_foreign_key "moves", "matches"
end
