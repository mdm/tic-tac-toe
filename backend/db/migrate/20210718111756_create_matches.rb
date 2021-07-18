class CreateMatches < ActiveRecord::Migration[6.1]
  def change
    create_table :matches do |t|
      t.references :noughts, null: false
      t.references :crosses, null: false
      t.integer :accepted_moves
      t.boolean :finished

      t.timestamps
    end

    add_foreign_key :matches, :players, column: :noughts_id
    add_foreign_key :matches, :players, column: :crosses_id
  end
end
