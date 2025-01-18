
export enum Dir {
   North = "N",
   East = "E",
   South = "S",
   West = "W",
}

export namespace Dir {
   export const turnClockwise= (dir : Dir) : Dir =>{
      switch (dir) {
         case Dir.North: return Dir.East
         case Dir.East: return Dir.South
         case Dir.South: return Dir.West
         case Dir.West: return Dir.North
      }
   }

   export const turnAntiClockwise= (dir : Dir) : Dir =>{
      switch (dir) {
         case Dir.North: return Dir.West
         case Dir.West: return Dir.South
         case Dir.South: return Dir.East
         case Dir.East: return Dir.North
      }
   }

   export const moveForward = (pos: Pos, dir: Dir): Pos =>{
      switch (dir) {
         case Dir.South: {
            return {
               x: pos.x,
               y: pos.y +1
            }
         }
         case Dir.North: {
            return {
               x: pos.x,
               y: pos.y-1
            }
         }
         case Dir.East: {
            return {
               x: pos.x+1,
               y: pos.y,
            }
         }
         case Dir.West: {
            return {
               x: pos.x-1,
               y: pos.y,
            }
         }
      }
   }

}
