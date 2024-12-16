// 
// THIS FILE HAS BEEN GENERATED AUTOMATICALLY
// DO NOT CHANGE IT MANUALLY UNLESS YOU KNOW WHAT YOU'RE DOING
// 
// GENERATED USING @colyseus/schema 2.0.36
// 

using Colyseus.Schema;
using Action = System.Action;
#if UNITY_5_3_OR_NEWER
using UnityEngine.Scripting;
#endif

public partial class LobbyState : Schema {
#if UNITY_5_3_OR_NEWER
[Preserve] 
#endif
public LobbyState() { }
	[Type(0, "array", typeof(ArraySchema<bool>), "boolean")]
	public ArraySchema<bool> colors = new ArraySchema<bool>();

	[Type(1, "map", typeof(MapSchema<PlayerLobby>))]
	public MapSchema<PlayerLobby> players = new MapSchema<PlayerLobby>();

	/*
	 * Support for individual property change callbacks below...
	 */

	protected event PropertyChangeHandler<ArraySchema<bool>> __colorsChange;
	public Action OnColorsChange(PropertyChangeHandler<ArraySchema<bool>> __handler, bool __immediate = true) {
		if (__callbacks == null) { __callbacks = new SchemaCallbacks(); }
		__callbacks.AddPropertyCallback(nameof(this.colors));
		__colorsChange += __handler;
		if (__immediate && this.colors != null) { __handler(this.colors, null); }
		return () => {
			__callbacks.RemovePropertyCallback(nameof(colors));
			__colorsChange -= __handler;
		};
	}

	protected event PropertyChangeHandler<MapSchema<PlayerLobby>> __playersChange;
	public Action OnPlayersChange(PropertyChangeHandler<MapSchema<PlayerLobby>> __handler, bool __immediate = true) {
		if (__callbacks == null) { __callbacks = new SchemaCallbacks(); }
		__callbacks.AddPropertyCallback(nameof(this.players));
		__playersChange += __handler;
		if (__immediate && this.players != null) { __handler(this.players, null); }
		return () => {
			__callbacks.RemovePropertyCallback(nameof(players));
			__playersChange -= __handler;
		};
	}

	protected override void TriggerFieldChange(DataChange change) {
		switch (change.Field) {
			case nameof(colors): __colorsChange?.Invoke((ArraySchema<bool>) change.Value, (ArraySchema<bool>) change.PreviousValue); break;
			case nameof(players): __playersChange?.Invoke((MapSchema<PlayerLobby>) change.Value, (MapSchema<PlayerLobby>) change.PreviousValue); break;
			default: break;
		}
	}
}

