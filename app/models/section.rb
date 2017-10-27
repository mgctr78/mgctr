class Section < ApplicationRecord
  has_many :persons
  validates :name, presence: true, uniqueness: true
end
