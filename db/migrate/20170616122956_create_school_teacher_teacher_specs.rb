class CreateSchoolTeacherTeacherSpecs < ActiveRecord::Migration[5.0]
  def change
    create_table :school_teacher_teacher_specs do |t|

      t.belongs_to :school_teacher, index: true
      t.belongs_to :teacher_spec, index: true
      t.timestamps
    end
  end
end
