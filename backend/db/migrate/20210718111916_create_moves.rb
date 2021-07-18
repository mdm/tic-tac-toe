class CreateMoves < ActiveRecord::Migration[6.1]
  def change
    create_table :moves do |t|
      t.references :match, null: false, foreign_key: true
      t.integer :number
      t.integer :cell

      t.timestamps
    end
  end
end
