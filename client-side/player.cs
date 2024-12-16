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

namespace MyGame.Schema {
	public partial class player : Schema {
#if UNITY_5_3_OR_NEWER
[Preserve] 
#endif
public player() { }
		[Type(0, "string")]
		public string sessionId = default(string);

		[Type(1, "string")]
		public string name = default(string);

		[Type(2, "boolean")]
		public bool isReady = default(bool);

		[Type(3, "int32")]
		public int color = default(int);

		[Type(4, "array", typeof(ArraySchema<float>), "number")]
		public ArraySchema<float> tile = new ArraySchema<float>();

		[Type(5, "array", typeof(ArraySchema<float>), "number")]
		public ArraySchema<float> store = new ArraySchema<float>();

		[Type(6, "int32")]
		public int money = default(int);

		/*
		 * Support for individual property change callbacks below...
		 */

		protected event PropertyChangeHandler<string> __sessionIdChange;
		public Action OnSessionIdChange(PropertyChangeHandler<string> __handler, bool __immediate = true) {
			if (__callbacks == null) { __callbacks = new SchemaCallbacks(); }
			__callbacks.AddPropertyCallback(nameof(this.sessionId));
			__sessionIdChange += __handler;
			if (__immediate && this.sessionId != default(string)) { __handler(this.sessionId, default(string)); }
			return () => {
				__callbacks.RemovePropertyCallback(nameof(sessionId));
				__sessionIdChange -= __handler;
			};
		}

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

		protected event PropertyChangeHandler<ArraySchema<float>> __tileChange;
		public Action OnTileChange(PropertyChangeHandler<ArraySchema<float>> __handler, bool __immediate = true) {
			if (__callbacks == null) { __callbacks = new SchemaCallbacks(); }
			__callbacks.AddPropertyCallback(nameof(this.tile));
			__tileChange += __handler;
			if (__immediate && this.tile != null) { __handler(this.tile, null); }
			return () => {
				__callbacks.RemovePropertyCallback(nameof(tile));
				__tileChange -= __handler;
			};
		}

		protected event PropertyChangeHandler<ArraySchema<float>> __storeChange;
		public Action OnStoreChange(PropertyChangeHandler<ArraySchema<float>> __handler, bool __immediate = true) {
			if (__callbacks == null) { __callbacks = new SchemaCallbacks(); }
			__callbacks.AddPropertyCallback(nameof(this.store));
			__storeChange += __handler;
			if (__immediate && this.store != null) { __handler(this.store, null); }
			return () => {
				__callbacks.RemovePropertyCallback(nameof(store));
				__storeChange -= __handler;
			};
		}

		protected event PropertyChangeHandler<int> __moneyChange;
		public Action OnMoneyChange(PropertyChangeHandler<int> __handler, bool __immediate = true) {
			if (__callbacks == null) { __callbacks = new SchemaCallbacks(); }
			__callbacks.AddPropertyCallback(nameof(this.money));
			__moneyChange += __handler;
			if (__immediate && this.money != default(int)) { __handler(this.money, default(int)); }
			return () => {
				__callbacks.RemovePropertyCallback(nameof(money));
				__moneyChange -= __handler;
			};
		}

		protected override void TriggerFieldChange(DataChange change) {
			switch (change.Field) {
				case nameof(sessionId): __sessionIdChange?.Invoke((string) change.Value, (string) change.PreviousValue); break;
				case nameof(name): __nameChange?.Invoke((string) change.Value, (string) change.PreviousValue); break;
				case nameof(isReady): __isReadyChange?.Invoke((bool) change.Value, (bool) change.PreviousValue); break;
				case nameof(color): __colorChange?.Invoke((int) change.Value, (int) change.PreviousValue); break;
				case nameof(tile): __tileChange?.Invoke((ArraySchema<float>) change.Value, (ArraySchema<float>) change.PreviousValue); break;
				case nameof(store): __storeChange?.Invoke((ArraySchema<float>) change.Value, (ArraySchema<float>) change.PreviousValue); break;
				case nameof(money): __moneyChange?.Invoke((int) change.Value, (int) change.PreviousValue); break;
				default: break;
			}
		}
	}
}
