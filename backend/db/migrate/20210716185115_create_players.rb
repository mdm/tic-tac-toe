class CreatePlayers < ActiveRecord::Migration[6.1]
  def change
    create_table :players do |t|
      t.string :name, null: false
      t.string :password_digest, null: false
      t.boolean :online, null: false, default: false

      t.timestamps
    end

    add_index :players, :name, unique: true
  end
end
