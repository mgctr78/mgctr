class CreatePeople < ActiveRecord::Migration[5.1]
  def change
    create_table :people do |t|
      t.string :name
      t.string :BirthYear
      t.string :BirthMonth
      t.string :BirthDay
      t.string :BirthTime
      t.text :description
      t.references :section, foreign_key: true

      t.timestamps
    end
  end
end
