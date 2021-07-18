class Player < ApplicationRecord
  has_many :noughts_matches, class_name: 'Match', foreign_key: 'noughts_id'
  has_many :crosses_matches, class_name: 'Match', foreign_key: 'crosses_id'
  has_secure_password

  validates :name, presence: true, uniqueness: true
end
