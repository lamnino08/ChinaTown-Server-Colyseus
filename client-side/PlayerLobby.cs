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

public partial class PlayerLobby : Schema {
#if UNITY_5_3_OR_NEWER
[Preserve] 
#endif
public PlayerLobby() { }
	[Type(0, "string")]
	public string name = default(string);

	[Type(1, "boolean")]
	public bool isReady = default(bool);

	[Type(2, "int32")]
	public int color = default(int);

	/*
	 * Support for individual property change callbacks below...
	 */

	protected event PropertyChangeHandler<string> __nameChange;
	public Action OnNameChange(PropertyChangeHandler<string> __handler, bool __immediate = true) {
		if (__callbacks == null) { __callbacks = new SchemaCallbacks(); }
		__callbacks.AddPropertyCallback(nameof(this.name));
		__nameChange += __handler;
		if (__immediate && this.name != default(string)) { __handler(this.name, default(string)); }
		return () => {
			__callbacks.RemovePropertyCallback(nameof(name));
			__nameChange -= __handler;
		};
	}

	protected event PropertyChangeHandler<bool> __isReadyChange;
	public Action OnIsReadyChange(PropertyChangeHandler<bool> __handler, bool __immediate = true) {
		if (__callbacks == null) { __callbacks = new SchemaCallbacks(); }
		__callbacks.AddPropertyCallback(nameof(this.isReady));
		__isReadyChange += __handler;
		if (__immediate && this.isReady != default(bool)) { __handler(this.isReady, default(bool)); }
		return () => {
			__callbacks.RemovePropertyCallback(nameof(isReady));
			__isReadyChange -= __handler;
		};
	}

	protected event PropertyChangeHandler<int> __colorChange;
	public Action OnColorChange(PropertyChangeHandler<int> __handler, bool __immediate = true) {
		if (__callbacks == null) { __callbacks = new SchemaCallbacks(); }
		__callbacks.AddPropertyCallback(nameof(this.color));
		__colorChange += __handler;
		if (__immediate && this.color != default(int)) { __handler(this.color, default(int)); }
		return () => {
			__callbacks.RemovePropertyCallback(nameof(color));
			__colorChange -= __handler;
		};
	}

	protected override void TriggerFieldChange(DataChange change) {
		switch (change.Field) {
			case nameof(name): __nameChange?.Invoke((string) change.Value, (string) change.PreviousValue); break;
			case nameof(isReady): __isReadyChange?.Invoke((bool) change.Value, (bool) change.PreviousValue); break;
			case nameof(color): __colorChange?.Invoke((int) change.Value, (int) change.PreviousValue); break;
			default: break;
		}
	}
}

