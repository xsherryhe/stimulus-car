class AddCarRefToVariants < ActiveRecord::Migration[7.0]
  def change
    add_reference :variants, :car, null: false, foreign_key: true
  end
end
