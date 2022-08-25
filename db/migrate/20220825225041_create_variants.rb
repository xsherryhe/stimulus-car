class CreateVariants < ActiveRecord::Migration[7.0]
  def change
    create_table :variants do |t|
      t.string :name
      t.string :color

      t.timestamps
    end
  end
end
