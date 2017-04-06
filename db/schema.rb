# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170403165538) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "normalclass_students", force: :cascade do |t|
    t.integer  "student_id"
    t.integer  "normalclass_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.index ["normalclass_id"], name: "index_normalclass_students_on_normalclass_id", using: :btree
    t.index ["student_id"], name: "index_normalclass_students_on_student_id", using: :btree
  end

  create_table "normalclasses", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_normalclasses_on_name", using: :btree
  end

  create_table "students", force: :cascade do |t|
    t.integer  "studentlist_id"
    t.integer  "user_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.index ["user_id"], name: "index_students_on_user_id", using: :btree
  end

  create_table "substituteteachers", force: :cascade do |t|
    t.date     "expiration"
    t.integer  "teacher_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["teacher_id"], name: "index_substituteteachers_on_teacher_id", using: :btree
  end

  create_table "teachers", force: :cascade do |t|
    t.string   "type"
    t.integer  "teacher_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["teacher_id"], name: "index_teachers_on_teacher_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "username",               default: "", null: false
    t.string   "givenname",              default: "", null: false
    t.string   "familyname",             default: "", null: false
    t.string   "type",                   default: "", null: false
    t.string   "region",                 default: "", null: false
    t.string   "school"
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true, using: :btree
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

end
