class CreateSettings < ActiveRecord::Migration[5.1]
  def change
    create_table :settings do |t|
      t.string :setting01
      t.string :setting02
      t.string :setting03
      t.string :setting04
      t.string :setting05

      t.timestamps
    end
  end
end
